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

const getAllCategories = catchAsync(async(req:Request, res:Response, next: NextFunction) => {
    const result = await categoryService.getAllCategoriesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category retrieved successfully",
        data: result
    })
});

const updateCategory = catchAsync(async(req:Request, res:Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await categoryService.updateCategoryFromDB(id as string, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category updated successfully",
        data: result
    })
})


const deleteCategory = catchAsync(async(req:Request, res:Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await categoryService.deleteCategoryFromDB(id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category deleted successfully",
        data: result
    })
})

export const categoryController = {
    createNewCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}