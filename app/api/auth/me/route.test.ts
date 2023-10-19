/**
 * @jest-environment node
 */
import { GET } from "./route"; 

jest.mock("../../../../helpers/getDataFromToken", () => ({
  getDataFromToken: jest.fn(),
}));

jest.mock("../../../../models/userModel", () => ({
  User: { findOne: jest.fn() },
}));

jest.mock("../../../../lib/dbConnect", () => ({
  dbConnect: jest.fn(),
}));

import { NextRequest } from "next/server";

describe("GET Function", () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    mockRequest = {} as NextRequest;
  });

  it("should return user data when user is found", async () => {
    const mockUser = {
      _id: "1234567890",
      name: "Test User",
    };

    require("../../../../helpers/getDataFromToken").getDataFromToken.mockResolvedValue(
      "1234567890"
    );

    require("../../../../models/userModel").User.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    require("../../../../lib/dbConnect").dbConnect.mockResolvedValue(true);

    const response = await GET(mockRequest);

    expect(await response?.json()).toEqual({
      message: "User found",
      data: mockUser,
    });

    expect(response.status).toBe(200);
  });

  it("should return an error response when there is an error", async () => {
    const mockError = new Error("Test error");

    require("../../../../helpers/getDataFromToken").getDataFromToken.mockRejectedValue(
      mockError
    );

    const response = await GET(mockRequest);
    
    expect(response.status).toBe(400);
  });
});
