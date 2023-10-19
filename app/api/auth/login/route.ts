import User from "@/models/userModel";
import { tokenName } from "@/const";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ValidationError } from "@/lib/erros";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const errorMessage =
      "The username and/or password used for authentication are invalid";

    const reqBody = await request.json();
    const { username, password } = reqBody;
    const user = await User.findOne({ username });

    //Check if user exists
    if (!user) {
      return ValidationError(errorMessage);
    }

    //Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return ValidationError(errorMessage);
    }

    //Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
    };

    //Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    //Sent token to user cookies
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set(tokenName, token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
