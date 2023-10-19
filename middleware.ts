import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "./const/routes";
import { tokenName } from "./const";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(tokenName)?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    request.cookies.delete(tokenName);

    const response = NextResponse.redirect(
      new URL("/authentication", request.url)
    );

    response.cookies.delete(tokenName);

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

}

export const config = {
  matcher: ["/", "/authentication", "/dashboard"],
};
