import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("[PROXY KASVAULT]", request.nextUrl.pathname, "Cookie sesi:", request.cookies.has("sesi"));

  if (!request.cookies.has("sesi")) {
    return NextResponse.redirect(new URL("/masuk", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/transaksi"],
};
