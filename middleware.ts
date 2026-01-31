// app/middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1. Ignore internal Next.js and static requests
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Check if sessionStarted cookie is true
  const sessionStarted = req.cookies.get("sessionStarted")?.value === "true";

  // 3. If session started AND user is NOT on /questions, redirect
  if (sessionStarted && pathname !== "/questions") {
    const url = new URL("/questions", req.url);
    url.searchParams.set("warning", "finish-questions");
    return NextResponse.redirect(url);
  }

  // 4. Otherwise, let them continue
  return NextResponse.next();
}
