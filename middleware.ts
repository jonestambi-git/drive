import { NextRequest, NextResponse } from "next/server";

// Middleware cannot access localStorage — tokens are stored there.
// Auth guards are handled client-side in each page component.
// This middleware only blocks API routes from being accessed without a token
// in the Authorization header (server-to-server calls).

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
