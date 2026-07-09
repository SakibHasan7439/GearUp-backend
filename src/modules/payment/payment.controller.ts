import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { paymentService } from './payment.service';
import httpStatus from 'http-status';

const createCheckoutSession = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const { rentalOrderId } = req.body;

  const result = await paymentService.createCheckoutSession(userId, rentalOrderId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Checkout session created successfully',
    data: result,
  });
});

const webhookHandler = catchAsync(async (req: Request, res: Response) => {
  const event = req.body as Buffer;
  const signature = req.headers['stripe-signature'] as string;

  await paymentService.webhookHandler(event, signature);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Webhook processed successfully',
    data: null,
  });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.getMyPaymentsFromDB(req.user?.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payments retrieved successfully',
    data: result,
  });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await paymentService.getPaymentByIdFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment retrieved successfully',
    data: result,
  });
});

export const paymentController = {
  createCheckoutSession,
  webhookHandler,
  getMyPayments,
  getPaymentById,
};