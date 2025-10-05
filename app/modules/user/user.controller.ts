import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    sendResponse(res, {
        statusCode: 200,
        data: user,
        message: "User created Successfully",
        success: true
    })
})

export const userController = {
    createUser
}