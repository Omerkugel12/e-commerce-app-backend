import { model, Schema } from "mongoose";
import { ICart } from "../types";

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Cart = model<ICart>("Cart", cartSchema);
export default Cart;
