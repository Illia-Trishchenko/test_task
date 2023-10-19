import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { tokenName } from "@/const";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get(tokenName)?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error("Invalid token");
  }
};
