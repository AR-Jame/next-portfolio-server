import { Router } from "express"
import { blogController } from "./blog.controller";

const router = Router();

router.post('/create', blogController.createBlog)
router.get('/all-blogs', blogController.getAllBlogs)
router.get('/:id', blogController.getBlogById)

export const blogRoutes = router;