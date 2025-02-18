import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";

describe("visitorRouter", () => {
  it("GET /api/visitor", async () => {
    const response = await request(app).get("/api/visitor");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
    expect(response.body[0]).toHaveProperty("title", "Welds during last week");
    expect(response.body[0]).toHaveProperty("value");
    expect(response.body[0]).toHaveProperty("image");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
