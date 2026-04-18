import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";
import mongoose from "mongoose";
import connectDB from "../src/config/db.js";

describe("Auth Routes", () => {

  let token;

  beforeAll(async () => {
    await connectDB();
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    if (res.statusCode !== 201) {
      console.log("Registration failed body:", JSON.stringify(res.body, null, 2));
    }
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@example.com");
  });

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

});