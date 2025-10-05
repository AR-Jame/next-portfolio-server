/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "../../config/db"
import bcryptjs from "bcrypt"
import AppError from "../../errorHelper/AppError"

const login = async (payload: { email: string, password: string }) => {

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        },
    })

    if(!user){
        throw new AppError(500, "User does not found.")
    }

    const isPassMatched = await bcryptjs.compare(payload.password, user?.password as string)
    if (!isPassMatched) {
        throw new AppError(500, "Password does not matched")
    }

    const { password, ...other } = user;
    return other
}


export const authService = {
    login
}