import express, { type Request, type Response } from "express"
import cors from 'cors'
import { userRoute } from "./modules/user/user.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import { authRoute } from "./modules/auth/auth.route";
import { blogRoutes } from "./modules/blog/blog.route";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use("/user", userRoute);
app.use('/auth', authRoute);
app.use('/blog', blogRoutes)

app.get("/", (_req: Request, res: Response) => {
    res.send("Next portfolio server.")
})

app.use(globalErrorHandler)

app.use(notFound)

export default app;