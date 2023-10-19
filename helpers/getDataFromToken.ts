import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { tokenName } from "@/const";
import { UserJwtPayload } from "@/types";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get(tokenName)?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as UserJwtPayload;
    return decodedToken.id;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
