import { Prisma } from "@prisma/client";
import prisma from "../../config/db";

const createBlog = async (payload: Prisma.BlogCreateInput) => {

    const slug = payload.title.toLowerCase().trim().split(" ").join("-")
    payload.slug = slug
    const result = await prisma.blog.create({
        data: payload
    })
    return result
}


export const blogService = {
    createBlog,
    // getAllPostByUser,
    // getPostById,
    // updatePostById,
    // deletePost,
    // getPostStat
}