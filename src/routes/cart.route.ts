import { Router } from "express";
import { getCarts } from "../controllers/cart.controller";

const router = Router();

router.get("/", getCarts);

export default router;
