import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";
import type { Request, Response } from "express";

const login = catchAsync(async (req: Request, res: Response) => {
    const user = await authService.login(req.body);
    sendResponse(res, {
        statusCode: 201,
        data: user,
        message: "User logged in Successfully",
        success: true
    })
})

export const authController = {
    login
}
