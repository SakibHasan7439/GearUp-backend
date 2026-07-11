import { prisma } from "../../lib/prisma";
import { IRentalOrderPayload } from "./rentalOrder.interface";

const createRentalOrderIntoDB = async(customerId: string, payload: IRentalOrderPayload) => {
    return prisma.$transaction(async(tx) => {
        let totalAmount = 0;
        const orderItemData = [];

        for(const item of payload.items){
            const gear = await tx.gearItem.findUnique({
                where: {
                    id: item.gearItemId
                }
            });

            if(gear?.availableQuantity! < item.quantity){
                throw new Error(`Not enough stock for ${gear?.name}`)
            }

            const startDate = new Date(item.startDate);
            const endDate = new Date(item.endDate);

            const days = Math.ceil(
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
            ) || 1;

            const price = gear?.price! * item.quantity * days;
            totalAmount += price;

            orderItemData.push({
                gearItemId: item.gearItemId,
                quantity: item.quantity,
                startDate,
                endDate,
                pricePerDay: gear!.price
            });

            await tx.gearItem.update({
                where: {
                    id: item.gearItemId,
                },
                data: {
                    availableQuantity: {
                        decrement: item.quantity
                    }
                }
            })
        };

        const order = await tx.rentalOrder.create({
            data: {
                customerId,
                status: "PENDING",
                totalAmount,
                items: {
                    create: orderItemData
                }
            },
            include: {
                items: true
            }
        });

        return order;
    })
};

const getMyRentalOrdersFromDB = async(customerId: string) => {
    const customer = await prisma.user.findUnique({
        where: {
            id: customerId
        }
    });

    if(!customer) {
        throw new Error("User does not exist");
    };

    const result = await prisma.rentalOrder.findMany({
        where: {
            customerId
        },
        include: {
            items: {
                include: {
                    gearItem: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return result;
}

const getRentalOrdersByIdFromDB = async(id: string) => {
    const result = await prisma.rentalOrder.findUniqueOrThrow({
        where: { id },
        include: {
            items: {
                include: {
                    gearItem: true
                }
            }
        }
    });

    return result;
}

const getAllRentalOrdersFromDB = async() => {
    const result = await prisma.rentalOrder.findMany();
    return result;
}

export const rentalOrderService = {
    createRentalOrderIntoDB,
    getAllRentalOrdersFromDB,
    getMyRentalOrdersFromDB,
    getRentalOrdersByIdFromDB
}