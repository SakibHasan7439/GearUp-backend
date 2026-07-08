import { prisma } from "../../lib/prisma";
import { ICategoryPayload } from "./category.interface";

const createNewCategoryIntoDB = async(payload: ICategoryPayload) => {
    const result = await prisma.category.create({
        data: payload
    });

    return result;
};

export const categoryService = {
    createNewCategoryIntoDB
}