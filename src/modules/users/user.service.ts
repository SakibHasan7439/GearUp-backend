import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";

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

export const userService = {
    registerUserIntoDB
}