import { Request, Response } from "express";
import Product from "../models/product.model";

export async function getProductsCount(req: Request, res: Response) {
  try {
    const count = await Product.countDocuments({});
    res.status(200).json({ count });
  } catch (error: any) {
    console.log(error);
    console.log(
      "product.controller, getProductsCount. Error while getting products count"
    );
    res.status(500).json({ mesagge: error.mesagge });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error: any) {
    console.log(error);
    console.log(
      "product.controller, getproducts. Error while getting products"
    );
    res.status(500).json({ mesagge: error.mesagge });
  }
}

export async function getProductById(req: Request, res: Response) {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product not found with id: ${productId}` });
    }
    res.status(200).json(product);
  } catch (error: any) {
    console.log(error);
    console.log(
      `product.controller, getProductById. Error while getting product by id: ${productId}`
    );
    res.status(500).json({ mesagge: error.mesagge });
  }
}
