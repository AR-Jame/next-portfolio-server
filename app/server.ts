import type { Server } from "http";
import prisma from "./config/db";
import app from "./app";
import env from "dotenv"

env.config();

let server: Server;


const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Postgres connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1)
    }
}


const startServer = async () => {
    try {
        await connectDB();
        server = app.listen(process.env.PORT, () => {
            console.log("Server is running ");
        })

        handleProcessEvents()

    } catch (error) {
        console.error("❌ Error during server startup:", error);
        process.exit(1);
    }
}

const gracefulShutdown = (event: string) => {
    console.log(event, "received. Server shutting down...");

    if (server) {
        server.close(() => {
            console.log("http server closed successfully");
        })

        try {
            console.log("Server shutdown complete.");
        } catch (error) {
            console.error("❌ Error during shutdown:", error);
        }

        process.exit(0)
    } else {
        process.exit(0)
    }

}

const handleProcessEvents = async () => {
    process.on("SIGTERM", () => {
        gracefulShutdown("SIGTERM")
    });
    process.on("SIGINT", () => {
        gracefulShutdown("SIGINT")
    });
    process.on("uncaughtException", (error) => {
        console.log("UncaughtException", error);
        gracefulShutdown("uncaughtException")
    })
    process.on("unhandledRejection", (error) => {
        console.log("unhandledRejection", error);
        gracefulShutdown("unhandledRejection")
    })
}