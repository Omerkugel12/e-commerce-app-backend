import { Router } from "express";
import { createNewCartItem, getCarts } from "../controllers/cart.controller";

const router = Router();

router.get("/", getCarts);
router.patch("/create", createNewCartItem);

export default router;
