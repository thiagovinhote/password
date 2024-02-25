import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
const publicRoutes = ["/"];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
const apiAuthPrefix = "/api/auth";

export async function middleware(request: NextRequest) {
  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  if (isApiAuthRoute || isPublicRoute) return null;

  return withAuth(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
