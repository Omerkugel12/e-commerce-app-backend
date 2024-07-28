import { Router } from "express";
import {
  createNewCartItem,
  deleteCartItem,
  getCarts,
} from "../controllers/cart.controller";

const router = Router();

router.get("/", getCarts);
router.patch("/create", createNewCartItem);
router.patch("/delete", deleteCartItem);

export default router;
