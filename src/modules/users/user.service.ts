import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUserPayload, RegisterUserPayload } from "./user.interface";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

const registerUserIntoDB = async(payload: RegisterUserPayload) => {
    const {name, email, password, role} = payload;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
            role
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email
        },
        omit: {
            password: true
        }
    });

    return user;
};

const loginUserFromDB = async(payload: ILoginUserPayload) => {
    const {email, password} = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {email}
    });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
        throw new Error("Incorrect Password");
    };

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);

    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string);

    return {
        accessToken,
        refreshToken
    }
};

const refreshToken = async(payload: string) => {
    const verifiedRefreshToken = jwtUtils.verifyToken(payload, config.jwt_refresh_secret as string);
    if(!verifiedRefreshToken.success){
        throw Error(verifiedRefreshToken.error);
    }

    const {id} = verifiedRefreshToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {id}
    });

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    );

    return {accessToken}
}

export const userService = {
    registerUserIntoDB,
    loginUserFromDB,
    refreshToken
}