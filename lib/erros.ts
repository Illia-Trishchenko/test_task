import { NextResponse } from "next/server";

export const ValidationError = (message: string, error?: Error) => {
  return NextResponse.json({ error, message }, { status: 400 });
};
