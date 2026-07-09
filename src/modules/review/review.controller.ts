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
        message: "Category successfully created",
        data: result
    })
});

const getReviews = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

});

export const reviewController = {
    createReview,
    getReviews
}