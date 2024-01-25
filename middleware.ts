import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GetDsAreaRoleCookie, HasDsAreaCookie } from "./@/lib/DsAreaCookies";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const hasCookie = await HasDsAreaCookie();
  const role = await GetDsAreaRoleCookie();

  if (request.nextUrl.pathname.startsWith("/siswa") && role != "3") {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  if (!request.nextUrl.pathname.startsWith("/siswa") && role == "3") {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  // jangan dipakai
  // if (hasCookie) {
  //   if (role == "3") {
  //     return NextResponse.rewrite(new URL("/siswa/dashboard", request.url));
  //   } else {
  //     return NextResponse.rewrite(new URL("/dashboard", request.url));
  //   }
  // } else {
  //   return NextResponse.rewrite(new URL("/", request.url));
  // }

  //
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
