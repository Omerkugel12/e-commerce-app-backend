import express, { Application } from "express";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import cartRoutes from "./routes/cart.route";
import { verifyToken } from "./middlewares/auth.middleware";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, userRoutes);
app.use("/api/cart", verifyToken, cartRoutes);
app.use("/api/product", productRoutes);
export default app;
