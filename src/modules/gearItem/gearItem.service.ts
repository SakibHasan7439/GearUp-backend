import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { IGearItemPayload, IGearItemUpdatePayload, IGearQuery } from "./gearItem.interface";

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

const getAllGearItemsFromDB = async(query: IGearQuery) => {
    const andConditions: Prisma.GearItemWhereInput[] = [];
    if(query.searchTerm){
        andConditions.push({
            OR: [
                {
                    name : {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                }
            ]
        })
    };

    if (query.category) {
        andConditions.push({
        categoryId: query.category,
        });
    }

    if (query.brand) {
        andConditions.push({
        brand: {
            equals: query.brand,
            mode: "insensitive",
        },
        });
    }

    if (query.available === "true") {
        andConditions.push({
        availableQuantity: {
            gt: 0,
        },
        });
    }

    if (query.minPrice || query.maxPrice) {
        andConditions.push({
        price: {
            ...(query.minPrice && { gte: Number(query.minPrice) }),
            ...(query.maxPrice && { lte: Number(query.maxPrice) }),
        },
        });
    }

    const allGearItems = await prisma.gearItem.findMany({
        where: {
            AND: andConditions
        },
        include: {
        category: true,
        },
    });

    return allGearItems;
}

const getAdminAllGearItemsFromDB = async() => {
    const result = await prisma.gearItem.findMany();
    return result;
}

const getGearItemById = async(id: string) => {
    const gearItem = await prisma.gearItem.findUnique({
        where: {id}
    });

    if(!gearItem){
        throw new Error("Gear not found!");
    };

    const result = await prisma.gearItem.findUnique({
        where: {id}
    });

    return result;
}

const getMyGearItemsFromDB = async(userId:string) => {
    const user = await prisma.gearItem.findMany(
        {
            where: { userId },
            include: {
                category: true
            }
        }
    );

    return user;
}

const updateGearIntoDB = async(id: string, data: Partial<IGearItemUpdatePayload>) => {
    const gear = await prisma.gearItem.findUnique({
        where: {id}
    });

    if(!gear){
        throw new Error("Gear does not exist");
    }

    const result = await prisma.gearItem.update({
        where: {
            id
        },
        data
    });

    return result;
}

const deleteGearFromDB = async(id: string) => {
    const gear = await prisma.gearItem.findUnique({
        where: { id }
    });

    if(!gear){
        throw new Error("Gear not found!");
    }

    const result = await prisma.gearItem.delete({
        where: {id}
    });

    return null;
}

export const gearItemService = {
    createGearIntoDB,
    getAllGearItemsFromDB,
    getAdminAllGearItemsFromDB,
    getGearItemById,
    getMyGearItemsFromDB,
    updateGearIntoDB,
    deleteGearFromDB
}