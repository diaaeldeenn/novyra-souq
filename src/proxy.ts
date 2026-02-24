import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const authPages = pathname === "/login" || pathname === "/register";
  const cartPage = pathname === "/cart" || pathname === "/wishlist";

  if (token && authPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && cartPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && !authPages && !cartPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/wishlist", "/login", "/register"],
};
