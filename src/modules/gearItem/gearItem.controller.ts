import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { gearItemService } from "./gearItem.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';


const createGear = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const {name, brand, description, categoryId} = req.body;

    const result = await gearItemService.createGearIntoDB({
        userId,
        name, 
        brand, 
        description, 
        categoryId
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category successfully created",
        data: result
    })
});

export const gearItemController = {
    createGear
}