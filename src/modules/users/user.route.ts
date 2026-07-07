import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/refresh-token", userController.refreshToken);

export const userRoute = router;