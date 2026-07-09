import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { providerService } from "./provider.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { RentalStatus } from "../../../generated/prisma/enums";


const getProviderComingOrders = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const providerId = req.user?.id;
    const result = await providerService.getProviderComingOrderFromDB(providerId as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental orders retrieved successfully",
        data: result
    })
});

const updateProviderOrderStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const orderId = req.params.id;
    const providerId = req.user?.id;
    const { status } = req.body;

    if (!Object.values(RentalStatus).includes(status)) {
        throw new Error('Invalid rental status');
    }

    const result = await providerService.updateProviderOrderStatus(providerId as string, orderId as string, status);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental orders status updated successfully",
        data: result
    })
});

export const providerController = {
    getProviderComingOrders,
    updateProviderOrderStatus
}