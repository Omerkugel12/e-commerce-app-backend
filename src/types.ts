import { Request } from "express";
import { Types } from "mongoose";

export interface CustomRequest extends Request {
  userId?: string;
}

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
}

interface CartProduct {
  _id: Types.ObjectId;
  count: number;
}

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
}

export interface ICart {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  products: CartProduct[];
}
