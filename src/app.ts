import express, { Application } from "express";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { verifyToken } from "./middlewares/auth.middleware";

const app = express();

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, userRoutes);

export default app;
