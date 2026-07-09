import Stripe from 'stripe';
import config from '../../config';
import { prisma } from '../../lib/prisma';
import { stripe } from '../../lib/stripe';

const createCheckoutSession = async (userId: string, rentalOrderId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.rentalOrder.findFirstOrThrow({
      where: { id: rentalOrderId, customerId: userId },
    });

    if (order.status !== 'PENDING') {
      throw new Error('This order is not eligible for payment');
    }

    const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Rental Order #${order.id}` },
            unit_amount: Math.round(order.totalAmount * 100), 
          },
          quantity: 1,
        },
      ],
      customer_email: user.email,
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `${config.appUrl}/rentals/${order.id}?success=true`,
      cancel_url: `${config.appUrl}/rentals/${order.id}?success=false`,
      metadata: { rentalOrderId: order.id },
    });

    await tx.payment.create({
      data: {
        transactionId: session.id,
        rentalOrderId: order.id,
        amount: order.totalAmount,
        method: 'STRIPE',
        status: 'PENDING',
      },
    });

    return session.url;
  });

  return { paymentUrl: result };
};

const webhookHandler = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;
  const event = await stripe.webhooks.constructEventAsync(payload, signature, endpointSecret);

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }
};

const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {
  const rentalOrderId = session.metadata?.rentalOrderId;

  if (!rentalOrderId) throw new Error('Webhook failed! Missing rentalOrderId');

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { transactionId: session.id },
      data: { status: 'COMPLETED', paidAt: new Date() },
    });

    await tx.rentalOrder.update({
      where: { id: rentalOrderId },
      data: { status: 'CONFIRMED' },
    });
  });
};

const getMyPaymentsFromDB = async (userId: string) => {
  return prisma.payment.findMany({
    where: { rentalOrder: { customerId: userId } },
    include: { rentalOrder: true },
    orderBy: { createdAt: 'desc' },
  });
};

const getPaymentByIdFromDB = async (id: string) => {
  return prisma.payment.findUniqueOrThrow({
    where: { id },
    include: { rentalOrder: true },
  });
};

export const paymentService = {
  createCheckoutSession,
  webhookHandler,
  getMyPaymentsFromDB,
  getPaymentByIdFromDB,
};