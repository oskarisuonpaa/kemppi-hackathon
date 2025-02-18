import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { usersRouter } from "./controllers/users";
import { dataRouter } from "./controllers/data";
import { loginRouter } from "./controllers/login";
import { visitorRouter } from "./controllers/visitor";
import * as middleware from "./utils/middleware";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.use("/api/data", middleware.tokenExtractor, middleware.userExtractor, dataRouter);
app.use("/api/users", middleware.tokenExtractor, middleware.userExtractor, usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/visitor", visitorRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
