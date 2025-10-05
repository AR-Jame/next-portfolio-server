import type { Request, Response } from "express";
import { blogService } from "./blog.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createBlog = catchAsync(async (req: Request, res: Response) => {
    const data = await blogService.createBlog(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Blog created successfully",
        data: data,
    })
})



export const blogController = {
    createBlog,
    // getAllPostByUser,
    // getPostById,
    // updatePostById,
    // deletePost,
    // getPostStat
}