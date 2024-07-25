import { model, Schema } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = model<IProduct>("Product", productSchema);
export default Product;
