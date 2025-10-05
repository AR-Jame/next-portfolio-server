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

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const data = await blogService.getAllBlogs(page, limit);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blogs retrieved successfully",
        data: data,
    })
})


const getBlogById = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id;

    const data = await blogService.getBlogById(Number(id));

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog retrieved successfully",
        data: data,
    })
})



export const blogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
}