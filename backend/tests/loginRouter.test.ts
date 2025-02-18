// loginRouter.test.ts
import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginRouter } from "../src/controllers/login";
import User from "../src/models/user";

jest.mock("../src/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("POST /login", () => {
  let app: express.Application;

  beforeAll(() => {
    process.env.SECRET = "testsecret";
  });

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/login", loginRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a token and user details when login credentials are valid", async () => {
    const dummyUser = {
      username: "testuser",
      passwordHash: "hashedpassword",
      _id: "123456",
      name: "Test User",
      role: "admin",
    };

    (User.findOne as jest.Mock).mockResolvedValue(dummyUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("dummy-token");

    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "correctpassword" })
      .expect(200);

    expect(response.body).toEqual({
      token: "dummy-token",
      username: "testuser",
      name: "Test User",
      role: "admin",
    });

    expect(jwt.sign).toHaveBeenCalledWith(
      { username: dummyUser.username, id: dummyUser._id.toString() },
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    );
  });

  it("should return 401 if the username does not exist", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post("/login")
      .send({ username: "nonexistent", password: "anyPassword" })
      .expect(401);

    expect(response.body).toEqual({
      error: "Invalid username or password",
    });
  });

  it("should return 401 if the password is incorrect", async () => {
    const dummyUser = {
      username: "testuser",
      passwordHash: "hashedpassword",
      _id: "123456",
      name: "Test User",
      role: "admin",
    };

    (User.findOne as jest.Mock).mockResolvedValue(dummyUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "wrongpassword" })
      .expect(401);

    expect(response.body).toEqual({
      error: "Invalid username or password",
    });
  });
});
