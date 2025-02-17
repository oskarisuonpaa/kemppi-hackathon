import { Router, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import * as middleware from "../utils/middleware";

const hashedPassword = async (password: string) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
};
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
        /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

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

// Update user

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, name, password, role } = req.body;

  const oldUser = await User.findById(id);
  if (!oldUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      username: username ?? oldUser.username,
      name: name ?? oldUser.name,
      password: password ? await hashedPassword(password) : oldUser.passwordHash,
      role: role ?? oldUser.role,
    },
    { new: true, runValidators: true, context: "query" }
  );

  res.json(updatedUser);
});
