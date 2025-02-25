import jwt from "jsonwebtoken";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// Defining errorHandler
interface ErrorHandler extends Error {
  name: string;
  message: string;
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};

interface UserType {
  username: string;
  passwordHash: string;
  _id: string;
  name: string;
}

interface CustomRequest extends Request {
  token?: any;
  user?: any;
}

// Defining handling authorization tokens
const tokenExtractor = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};

// MW for getting user with bearer token
const userExtractor = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!process.env.SECRET) {
    res.status(500);
    return;
  }
  if (!req.token) {
    res.status(401).json({ error: "token missing" });
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET);
  } catch (error) {
    res.status(401).json({ error: "token expired or invalid" });
    return;
  }

  if (!decodedToken || typeof decodedToken === "string") {
    res.status(401).json({ error: "token invalid" });
    return;
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    res.status(404).json({ error: "user not found" });
    return;
  }
  req.user = user;
  next();
};

export { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor };
