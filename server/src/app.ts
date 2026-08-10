import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "@/routes.js";
import { errorMiddleware } from "@/middlewares/error.middleware.js";
import { env } from "@/config/env.js";
import { prisma } from "./config/prisma.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: env.CLIENT_URL,
  credentials : true
}));

app.use(helmet());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.send("Server is live...")
});

app.use("/api", routes);

app.use(errorMiddleware);

export default app;