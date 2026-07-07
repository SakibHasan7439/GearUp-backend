import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';

const registerUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: {
            user
        }
    })
});


const loginUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const {accessToken, refreshToken} = await userService.loginUserFromDB(payload);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: {
            accessToken,
            refreshToken
        }
    })
})

const refreshToken = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    const {accessToken} = await userService.refreshToken(refreshToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    });

     sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Refresh token generated successfully",
        data: {
            accessToken
        }
    })
})

export const userController = {
    registerUser,
    loginUser,
    refreshToken
}