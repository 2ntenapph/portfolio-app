import { NextRequest, NextResponse } from "next/server";
import { decode } from "jsonwebtoken"; // No secret key needed

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const pathname = req.nextUrl.pathname;

  // ✅ Allow Public Pages: Home ("/") and Dynamic Slugs ("/[slug]")
  const isPublicRoute = pathname === "/" || /^\/[^\/]+$/.test(pathname);
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 🔐 If no accessToken, attempt to refresh or redirect
  if (!accessToken) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🔄 Try refreshing access token
    const refreshResponse = await fetch("http://localhost:5000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      return NextResponse.next(); // ✅ Continue if token refreshed
    } else {
      return NextResponse.redirect(new URL("/", req.url)); // 🔒 Redirect if refresh fails
    }
  }

  // 🔎 Decode Access Token (No Secret Key Needed)
  const decoded = decode(accessToken) as { exp?: number; role?: string };

  // 🚨 Check Expiration
  if (!decoded || !decoded.exp || Date.now() / 1000 > decoded.exp) {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete("accessToken"); // Remove expired token
    return response;
  }

  // 🔒 Protect Admin Pages (Strict Match)
  if (pathname === "/dashboard" && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/404", req.url)); // 🚫 Redirect non-admins
  }

  return NextResponse.next();
}

// ✅ Apply middleware to all protected routes
export const config = {
  matcher: ["/((?!api/|_next/|static/|favicon.ico).*)"], // Protects all routes except public files
};
