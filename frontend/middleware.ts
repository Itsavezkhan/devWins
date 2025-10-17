// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export const runtime = "experimental-edge";

// export const middleware = async (req: any) => {
//   if (req.nextUrl.pathname.startsWith("/auth")) {
//     return NextResponse.next();
//   }
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }
//   try {
//     await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }
// };

// export const config = {
//   matcher: ["/((?!auth|api/public).*)"],
// };

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const runtime = "edge";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req: any) {
  const pathname = req.nextUrl.pathname.replace(/\/$/, "");
  if (pathname.startsWith("/auth") || pathname.startsWith("/api/public")) {
    return NextResponse.next();
  }

  const token = req.cookies?.get?.("token")?.value;
  console.log("cookie", token);

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } else {
    try {
      console.log("bhi bhai", JWT_SECRET);
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );
      console.log("Verified payload:", verified);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/((?!auth|api/public|_next/static|_next/image|favicon.ico).*)"],
// };
export const config = {
  matcher: ["/dashboard/:path*", "/analytics/:path*", "/reflections/:path*"],
};
