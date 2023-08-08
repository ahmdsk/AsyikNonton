import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import SiteConfig from "./lib/SiteConfig";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  }

  request.headers.append("Referer", SiteConfig.scrapUrl);

  return response;
}
