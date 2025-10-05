import { Router } from "express"
import { blogController } from "./blog.controller";

const router = Router();

router.post('/create', blogController.createBlog)

export const blogRoutes = router;