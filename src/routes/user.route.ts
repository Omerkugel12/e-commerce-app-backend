import { Router } from "express";
import { getUserById } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getUserById);

export default router;
