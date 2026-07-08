import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                name: string;
                id: string;
                role: Role
            }
        }
    }
}


export const auth = (...requiredRole: Role[]) => {
    return catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken
        ? req.cookies.accessToken
        : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

        const verifiedToken = jwtUtils.verifyToken(token as string, config.jwt_access_secret as string);

        if(!verifiedToken.success){
            throw new Error(verifiedToken.error);
        }

        const { name, email, id, role } = verifiedToken.data as JwtPayload;

        if(requiredRole.length && !requiredRole.includes(role)){
            throw new Error("Forbidden! You don't have the permission to access this resource")
        };

        const user = await prisma.user.findUnique({
            where: {
                id,
                name,
                email,
                role
            }
        });

        if(!user){
            throw new Error("User not found! please login and try again");
        };

        req.user = {
            id,
            email,
            name, 
            role
        };

        next();
    })
}