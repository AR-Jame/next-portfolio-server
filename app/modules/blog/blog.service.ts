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

const getAllBlogs = async (page: number, limit: number) => {

    const data = await prisma.blog.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: "desc"
        }
    })
    const total = await prisma.blog.count()
    return {
        data,
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
        }
    }
}

const getBlogById = async (id: number) => {

    const result = await prisma.$transaction(async (tx) => {
        await tx.blog.update({
            where: { id: id },
            data: {
                viewCount: { increment: 1 }
            }
        });

        return await tx.blog.findUniqueOrThrow({
            where: { id: id },
        })
    })

    return result
}

export const blogService = {
    createBlog,
    getAllBlogs,
    getBlogById,

}