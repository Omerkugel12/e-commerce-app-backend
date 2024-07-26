import { Request, Response } from "express";
import Product from "../models/product.model";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
}
