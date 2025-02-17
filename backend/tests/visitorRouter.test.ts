import request from "supertest";
import app from "../src/server";

describe("visitorRouter", () => {
  it("GET /api/visitor", async () => {
    const response = await request(app).get("/api/visitor");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello visitor" });
  });
});
