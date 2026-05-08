import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next/server";
import { ACCESS_TOKEN } from "@/constants/auth";

const authenticatedRoute: string[] = ["/login", "/signup", "/forgot-password"];
const privateRoute: string[] = ["/profile"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticateRoute = authenticatedRoute.includes(path);
  const isPrivateRoute = privateRoute.includes(path);
  const accessToken = await getCookie(ACCESS_TOKEN, { req: request });

  if (isAuthenticateRoute && accessToken) {
    console.log("Redirecting to home because user is already logged in.");
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivateRoute && !accessToken) {
    console.log("Redirecting to login because user is not authenticated.");
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}
