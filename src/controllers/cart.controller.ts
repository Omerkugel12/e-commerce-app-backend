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

export async function createNewCartItem(req: CustomRequest, res: Response) {
  const { productId } = req.body;

  if (!productId) {
    return res
      .status(404)
      .json({ message: `Product not found with ID: ${productId}` });
  }

  try {
    let updatedCart = await Cart.findOneAndUpdate(
      { user: req.userId },
      { $push: { products: productId } },
      { new: true }
    ).populate("products");

    if (!updatedCart) {
      const newCart = await Cart.create({
        user: req.userId,
        products: [productId],
      });
      updatedCart = await Cart.findById(newCart._id).populate("products");
    }

    res.status(200).json(updatedCart);
  } catch (error: any) {
    console.log(error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      res.status(400).json({ message: "Invalid product ID" });
    } else if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation error", details: error.errors });
    } else {
      res.status(500).json({ message: "Error while creating new cart item" });
    }
  }
}

export async function deleteCartItem(req: CustomRequest, res: Response) {
  const { productId } = req.body;
  try {
    let updatedCart = await Cart.findOneAndUpdate(
      { user: req.userId },
      { $pull: { products: productId } },
      { new: true }
    ).populate("products");

    if (!updatedCart) {
      const newCart = await Cart.create({
        user: req.userId,
        products: [productId],
      });
      updatedCart = await Cart.findById(newCart._id).populate("products");
    }

    res.status(200).json(updatedCart);
  } catch (error: any) {
    console.log(error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      res.status(400).json({ message: "Invalid product ID" });
    } else if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation error", details: error.errors });
    } else {
      res.status(500).json({ message: "Error while deleting new cart item" });
    }
  }
}
