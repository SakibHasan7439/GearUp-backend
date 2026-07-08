import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';

const createNewCategory = catchAsync(async(req:Request, res:Response, next: NextFunction) => {
    const payload = req.body;
    const result = await categoryService.createNewCategoryIntoDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category successfully created",
        data: result
    })
});

export const categoryController = {
    createNewCategory
}