/**
 * @jest-environment node
 */
import { POST } from "./route";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


const mockRequest = {
  json: jest.fn().mockResolvedValue({
    username: "testuser",
    password: "testpassword",
  }),
};

jest.mock("../../../../models/userModel", () => ({
  User: { findOne: jest.fn() },
}));

jest.mock("../../../../lib/dbConnect", () => ({
  dbConnect: jest.fn(),
}));

describe("POST Function", () => {
  const tokenSecret = process.env.TOKEN_SECRET;
  it("should respond with a success message and set a token cookie for valid credentials", async () => {
    const user = {
      _id: "testuserid",
      username: "testuser",
      password: "hashedPassword",
    };

    require("../../../../models/userModel").User.findOne.mockReturnValue(user);

    bcrypt.compare = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue("testToken");

    const response = await POST(mockRequest as unknown as NextRequest);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "testpassword",
      "hashedPassword"
    );
    
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "testuserid", username: "testuser" },
      tokenSecret,
      { expiresIn: "1d" }
    );
    
    expect(await response?.json()).toEqual({
      message: "Login successfully",
      success: true,
    });

    expect(response.status).toBe(200);
  });

  it("should respond with a validation error for invalid credentials", async () => {

    require("../../../../models/userModel").User.findOne.mockReturnValue(null);

    const response = await POST(mockRequest as unknown as NextRequest);

    expect(response.status).toBe(400);
    
  });

  it("should respond with a validation error for invalid password", async () => {
    const user = {
      _id: "testuserid",
      username: "testuser",
      password: "hashedPassword",
    };
    
   
    require("../../../../models/userModel").User.findOne.mockReturnValue(user);
    
    bcrypt.compare = jest.fn().mockResolvedValue(false);

    const response = await POST(mockRequest as unknown as NextRequest);

    expect(response.status).toBe(400);
  });
});
