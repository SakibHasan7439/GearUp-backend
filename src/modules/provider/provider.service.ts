import { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { VALID_STATUS_TRANSITIONS } from "./provider.constant";

const getProviderComingOrderFromDB = async(providerId: string) => {
    const provider = await prisma.user.findUnique({
        where: {
            id: providerId
        }
    });

    if(!provider){
        throw new Error("Provider does not exist");
    };

    const result = await prisma.rentalOrder.findMany({
        where: {
            items: {
                some: {
                    gearItem: { 
                        userId: providerId
                     }
                }
            }
        },
        include: {
            items: {
                where: {
                    gearItem : {
                        userId: providerId
                    }
                }
            }
        }
    });

    return result;
};

const updateProviderOrderStatus = async(providerId: string, orderId: string, newStatus: RentalStatus) => {
    const order = await prisma.rentalOrder.findFirstOrThrow({
        where: {
            id: orderId,
            items: {
                some: {
                    gearItem: {
                        userId: providerId
                    }
                }
            }
        }
    });

    if(!VALID_STATUS_TRANSITIONS[order.status].includes(newStatus)){
        throw new Error(`Cannot move status from ${order.status} to ${newStatus}`);
    };

    const result = await prisma.rentalOrder.update({
        where: {
            id: orderId
        },
        data: {
            status: newStatus
        }
    });

    return result;
}

export const providerService = {
    getProviderComingOrderFromDB,
    updateProviderOrderStatus
}