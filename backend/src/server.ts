import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { usersRouter } from "./controllers/users";
import { dataRouter } from "./controllers/data";
import { loginRouter } from "./controllers/login";
import mongoose from "mongoose";
import * as middleware from "./utils/middleware";

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not defined");
    }

    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(middleware.requestLogger)

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.use("/api/data", middleware.tokenExtractor, middleware.userExtractor, dataRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);