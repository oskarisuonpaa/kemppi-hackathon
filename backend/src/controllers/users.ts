import { Router, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

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
usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { username, name, password, role, group } = req.body;

    if (!password) {
      res.status(400).json({ error: "Password is required" });
      return;
    }

    // Password must have:
    // - At least 8 characters
    // - At least one uppercase letter
    // - At least one lowercase letter
    // - At least one digit
    // - At least one special character (@, $, !, %, *, ?, &)
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
      role,
      group: group || [],
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user
usersRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, name, password, role, group } = req.body;

  const oldUser = await User.findById(id);
  if (!oldUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      username: username && username.trim() !== "" ? username : oldUser.username,
      name: name && name.trim() !== "" ? name : oldUser.name,
      passwordHash: password && password.trim() !== "" ? await hashedPassword(password) : oldUser.passwordHash,
      role: role && role.trim() !== "" ? role : oldUser.role,
      group: group && group[0] !== "" ? group : oldUser.group,
    },
    { new: true, runValidators: true, context: "query" }
  );

  res.json(updatedUser);
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(204).end();
});
