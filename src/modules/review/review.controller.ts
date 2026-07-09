import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reviewService } from "./review.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";


const createReview = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;
    const payload = req.body;
    const result = await reviewService.createReviewIntoDB(customerId as string, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review successfully created",
        data: result
    })
});

const getReviewsByGearItem = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const gearItemId = req.params.gearItemId;
    const result = await reviewService.getReviewByGearItemFromDB(gearItemId as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Review retrieved successfully",
        data: result
    })
});

export const reviewController = {
    createReview,
    getReviewsByGearItem
}