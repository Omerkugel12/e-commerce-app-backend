import { Request, Response } from "express";
import User from "../models/user.model";
import { CustomRequest } from "../types";

export async function getUserById(req: CustomRequest, res: Response) {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password, ...userWithoutPassword } = user._doc;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}
