import { Router, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import * as middleware from "../utils/middleware";

export const usersRouter = Router();

usersRouter.get("/", async (req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
});

// Create new user
usersRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req: Request, res: Response) => {
    try {
      const { username, name, password } = req.body;

      if (!password) {
        res.status(400).json({ error: "Password is required" });
        return;
      }

      //    - At least 8 chars
      //    - 1 uppercase
      //    - 1 lowercase
      //    - 1 digit
      //    - 1 special char
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!strongPasswordRegex.test(password)) {
        res.status(400).json({
          error:
            "Password must be at least 8 characters long and contain uppercase, lowercase, digit, and special character",
        });
        return;
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        name,
        passwordHash,
      });

      const savedUser = await user.save();

      res.status(201).json(savedUser);
      return;
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
