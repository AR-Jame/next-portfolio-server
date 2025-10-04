/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextFunction, type Request, type Response } from "express"
import AppError from "../errorHelper/AppError";
import { Prisma } from "@prisma/client";


export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500
    let message = `something went wrong!`;
    const errorSources: any[] = [];
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                statusCode = 400;
                message = `Duplicate value for ${err?.meta?.target}`
                break
            case 'P2025':
                statusCode = 404;
                message = 'Record not found'
                break
            case 'P2003':
                statusCode = 400;
                message = 'Foreign key constraint failed'
                break
            default:
                statusCode = 500;
                message = 'Database error occurred'
        }
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    console.log(err.code === "P2002");

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSources,
        err: process.env.NODE_ENV === 'development' ? err.err : null,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}