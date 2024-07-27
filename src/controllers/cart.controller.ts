import { Response } from "express";
import { CustomRequest } from "../types";
import Cart from "../models/cart.model";

export async function getCarts(req: CustomRequest, res: Response) {
  const { userId } = req;
  try {
    const carts = await Cart.find({ user: userId }).populate("products");
    res.status(200).json(carts);
  } catch (error: any) {
    console.log(error);
    console.log("cart.controller, getCarts. Error while getting carts");
    res.status(500).json({ mesagge: error.mesagge });
  }
}
