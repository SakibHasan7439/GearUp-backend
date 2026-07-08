import { prisma } from "../../lib/prisma";
import { ICategoryPayload, TCategory } from "./category.interface";

const createNewCategoryIntoDB = async(payload: ICategoryPayload) => {
    const result = await prisma.category.create({
        data: payload
    });

    return result;
};

const getAllCategoriesFromDB = async() => {
    const result = await prisma.category.findMany();
    return result;
};

const updateCategoryFromDB = async(id: string, data: Partial<TCategory>) => {
    const category = await prisma.category.findUnique({
        where: {id}
    });

    if(!category){
        throw new Error("Category not found!");
    }

    const result = await prisma.category.update({
        where: {
            id,
        },
        data
    })

    return result;
}

const deleteCategoryFromDB = async(id : string) => {

    const category = await prisma.category.findUnique({
        where: {id}
    });

    if(!category){
        throw new Error("Category not found!");
    }

    const result = await prisma.category.delete({
        where: {id}
    });

    return null;
}

export const categoryService = {
    createNewCategoryIntoDB,
    getAllCategoriesFromDB,
    updateCategoryFromDB,
    deleteCategoryFromDB
}