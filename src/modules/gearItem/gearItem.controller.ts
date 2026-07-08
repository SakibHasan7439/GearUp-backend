import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { gearItemService } from "./gearItem.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';


const createGear = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const {name, brand, description, price, totalQuantity, availableQuantity, categoryId} = req.body;

    const result = await gearItemService.createGearIntoDB({
        userId,
        name, 
        brand, 
        price,
        description, 
        totalQuantity, 
        availableQuantity,
        categoryId
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category successfully created",
        data: result
    })
});

const getAllGearItems = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await gearItemService.getAllGearItemsFromDB(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gears retrieved successfully",
        data: result
    })
});

const getAdminAllGearItems = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await gearItemService.getAdminAllGearItemsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gears retrieved successfully",
        data: result
    })
});

const getGearItemById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await gearItemService.getGearItemById(id as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "single gear retrieved successfully",
        data: result
    })
});

const getMyGearItems = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const result = await gearItemService.getMyGearItemsFromDB(userId as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user gear items retrieved successfully",
        data: result
    })
});

const updateGearItem = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await gearItemService.updateGearIntoDB(id as string, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear updated successfully",
        data: result
    })
})

const deleteGear = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await gearItemService.deleteGearFromDB(id as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear deleted successfully",
        data: result
    })
});



export const gearItemController = {
    createGear,
    getAllGearItems,
    getAdminAllGearItems,
    getGearItemById,
    getMyGearItems,
    updateGearItem,
    deleteGear
}