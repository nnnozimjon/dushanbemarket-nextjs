import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptToken } from "./utils";

const protectedRoutes = ["/active-orders", "/completed-orders", "/order"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes?.includes(path);

  const token: string = cookies().get("access_token")?.value || "";
  const userDetails: any = await decryptToken(token);

  if (isProtectedRoute) {
    if (!userDetails?.email) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if (!(userDetails?.user_role === "client")) {
      return NextResponse.redirect(new URL("/profile", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }
