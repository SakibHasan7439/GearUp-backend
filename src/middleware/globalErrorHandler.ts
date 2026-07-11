import { Request,Response, NextFunction } from "express"
import httpStatus from 'http-status';
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {

    let statusCode;
    let errorMessage = err.message || "Internal Server Error";
    let errorName = err.name || "Internal Server Error";

    if(err instanceof Prisma.PrismaClientValidationError){
        statusCode = httpStatus.BAD_REQUEST;
        errorMessage = "You have provided an incorrect field type of missing field"

    }else 
        if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === "P2002"){
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Duplicate key error";

        }else if(err.code === "P2003"){
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Foreign Key Constrain Failed";

        }else if(err.code === "P2025"){
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
        }
    }else if(err instanceof Prisma.PrismaClientInitializationError){
        if(err.errorCode === "P1000"){
            statusCode = httpStatus.UNAUTHORIZED;
            errorMessage = "Authentication failed against database server. Please check your database credentials";

        }else if(err.errorCode === "P1001"){
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Can't reach database server";
        }

    }else if(err instanceof Prisma.PrismaClientUnknownRequestError){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = "Error occurred during query execution."
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        message: errorMessage,
        error: err
    })
}