import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";

const createReviewIntoDB = async(customerId: string, payload: IReview) => {
    const customer = await prisma.user.findUnique({
        where: {
            id: customerId
        }
    });

    if(!customer) {
        throw new Error("Customer not found!");
    };

    const hasReturnedRental = await prisma.rentalOrderItem.findFirst({
        where: {
            gearItemId: payload.gearItemId,
            rentalOrder: {customerId, status: "RETURNED"}
        }
    });

    if(!hasReturnedRental){
        throw new Error("You can only review gear you have rented and returned");
    };

    const result = await prisma.review.create({
        data: {
            ...payload,
            customerId
        }
    });

    return result;
};

const getReviewByGearItemFromDB = async(gearItemId: string) => {

};

export const reviewService = {
    createReviewIntoDB,
    getReviewByGearItemFromDB
}