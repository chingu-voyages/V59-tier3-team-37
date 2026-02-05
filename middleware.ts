// middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Define the protected path(s)
  const isQuestionsPage = request.nextUrl.pathname.startsWith("/questions");

  // 2. Check for the role cookie
  // 'user_role' is the name of the cookie we will set later
  const hasRole = request.cookies.has("user_role");

  // 3. The Logic: If trying to access questions without a role, redirect.
  if (isQuestionsPage && !hasRole) {
    // Construct the URL for the redirect
    const roleUrl = new URL("/role", request.url);

    // Optional: Pass the original URL as a query param to redirect back later
    roleUrl.searchParams.set("from", request.nextUrl.pathname);

    return NextResponse.redirect(roleUrl);
  }

  // 4. If all checks pass, continue to the requested page
  return NextResponse.next();
}
