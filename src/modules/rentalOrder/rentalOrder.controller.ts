import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { rentalOrderService } from "./rentalOrder.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createRentalOrder = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;
    const payload = req.body;

    const result = await rentalOrderService.createRentalOrderIntoDB(customerId as string, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category successfully created",
        data: result
    })
});

const getAllRentalOrders = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await rentalOrderService.getAllRentalOrdersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental orders retrieved successfully",
        data: result
    })
});

const getMyRentalOrders = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;
    const result = await rentalOrderService.getMyRentalOrdersFromDB(customerId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental orders retrieved successfully",
        data: result
    })
});

const getRentalOrdersById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await rentalOrderService.getRentalOrdersByIdFromDB(id as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gears retrieved successfully",
        data: result
    })
});


export const rentalOrderController = {
    createRentalOrder,
    getAllRentalOrders,
    getMyRentalOrders,
    getRentalOrdersById
}