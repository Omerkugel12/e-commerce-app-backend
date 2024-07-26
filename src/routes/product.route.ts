import { Router } from "express";
import {
  getProductById,
  getProducts,
  getProductsCount,
} from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/count", getProductsCount);
router.get("/:productId", getProductById);

export default router;
