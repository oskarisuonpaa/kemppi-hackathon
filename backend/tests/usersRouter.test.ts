// usersRouter.test.ts
import express from "express";
import request from "supertest";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { usersRouter } from "../src/controllers/users";
import User from "../src/models/user";

let app: express.Application;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use("/api/users", usersRouter);
});

// Clear the users collection before each test
beforeEach(async () => {
  await User.deleteMany({});
});

describe("GET /api/users", () => {
  it("should return all users", async () => {
    // Seed two users with valid role values ("visitor" and "admin")
    const user1 = new User({
      username: "user1",
      name: "User One",
      passwordHash: "hash1",
      role: "visitor",
    });
    const user2 = new User({
      username: "user2",
      name: "User Two",
      passwordHash: "hash2",
      role: "admin",
    });
    await user1.save();
    await user2.save();

    const response = await request(app).get("/api/users").expect(200);
    // Since toJSON transforms remove _id and passwordHash, we expect "id"
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("username");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("role");
    // passwordHash should not be included
    expect(response.body[0]).not.toHaveProperty("passwordHash");
  });
});

describe("POST /api/users", () => {
  it("should create a new user with valid data", async () => {
    const newUser = {
      username: "newuser",
      name: "New User",
      password: "Password1!", // valid strong password
      role: "visitor", // valid role from enum ["visitor", "admin", "viewer"]
    };

    const response = await request(app).post("/api/users").send(newUser).expect(201);

    // Expect the transformed user to have an "id" property (not _id) and no passwordHash.
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.role).toBe(newUser.role);
    expect(response.body).not.toHaveProperty("passwordHash");

    // Verify that the user was actually saved in the database.
    const savedUser = await User.findOne({ username: "newuser" });
    expect(savedUser).toBeTruthy();
  });

  it("should return 400 if password is missing", async () => {
    const newUser = {
      username: "nouser",
      name: "No User",
      role: "visitor",
    };

    const response = await request(app).post("/api/users").send(newUser).expect(400);
    expect(response.body).toEqual({ error: "Password is required" });
  });

  it("should return 400 if password is weak", async () => {
    const newUser = {
      username: "weakuser",
      name: "Weak User",
      password: "weakpass", // does not meet strength criteria
      role: "visitor",
    };

    const response = await request(app).post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toMatch(/Password must be at least 8 characters long/);
  });

  it("should return 500 if there is a server error during user creation", async () => {
    // Simulate a server error by overriding the save method.
    const originalSave = User.prototype.save;
    User.prototype.save = jest.fn().mockImplementation(() => {
      throw new Error("Test error");
    });

    const newUser = {
      username: "erroruser",
      name: "Error User",
      password: "Password1!",
      role: "visitor",
    };

    const response = await request(app).post("/api/users").send(newUser).expect(500);
    expect(response.body).toEqual({ error: "Internal server error" });

    // Restore the original save method.
    User.prototype.save = originalSave;
  });
});

describe("PUT /api/users/:id", () => {
  it("should update an existing user", async () => {
    // Create a user to update.
    const user = new User({
      username: "updateuser",
      name: "Update User",
      passwordHash: await bcrypt.hash("Password1!", 10),
      role: "visitor",
    });
    await user.save();

    const updateData = {
      username: "updateduser",
      name: "Updated User",
      password: "NewPass1!", // new valid password
      role: "admin", // valid role update
    };

    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .send(updateData)
      .expect(200);

    expect(response.body.username).toBe(updateData.username);
    expect(response.body.name).toBe(updateData.name);
    expect(response.body.role).toBe(updateData.role);
    // passwordHash is removed from JSON, so we cannot assert its presence
    expect(response.body).not.toHaveProperty("passwordHash");
  });

  it("should return 404 if the user is not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const updateData = {
      username: "nonexistent",
      name: "Nonexistent",
      password: "Password1!",
      role: "visitor",
    };

    const response = await request(app)
      .put(`/api/users/${fakeId}`)
      .send(updateData)
      .expect(404);
    expect(response.body).toEqual({ error: "User not found" });
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete an existing user", async () => {
    const user = new User({
      username: "deleteuser",
      name: "Delete User",
      passwordHash: "hashdelete",
      role: "visitor",
    });
    await user.save();

    await request(app).delete(`/api/users/${user._id}`).expect(204);

    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});
