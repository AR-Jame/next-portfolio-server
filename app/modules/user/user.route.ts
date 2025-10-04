import { userController } from "./user.controller";
import express from "express"

const router = express.Router();


router.post("/create", userController.createUser)

export const userRoute = router;