import type { User } from "@prisma/client";
import bcryptjs from "bcrypt";
import prisma from "../../config/db";

const createUser = async (payload: Partial<User>) => {
    const { password, name, email } = payload;

    const hashedPassword = await bcryptjs.hash(password as string, Number(process.env.BCRYPT_SALT_ROUND))
    const res = await prisma.user.create({
        data: {
            name: name as string,
            email: email as string,
            password: hashedPassword as string
        }
    });

    return res

}


export const userService = {
    createUser
}