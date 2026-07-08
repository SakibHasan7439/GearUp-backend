import { prisma } from "../../lib/prisma";
import { IGearItemPayload } from "./gearItem.interface";

const createGearIntoDB = async(payload: IGearItemPayload) => {
    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId
        }
    });

    if(!category){
        throw new Error("Category not found!");
    }

    const result = await prisma.gearItem.create({
        data: {
            ...payload
        }
    });

    return result;
};


export const gearItemService = {
    createGearIntoDB
}