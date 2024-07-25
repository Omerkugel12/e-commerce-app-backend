import express, { Application } from "express";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

export default app;
