import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

// Configuration for middleware features
const MIDDLEWARE_CONFIG = {
  // Enable/disable 8-digit slug rewriting to /x/slug format
  enableSlugRewriting: true,
  slugRewritingPath: "/x",
  slugIgnoreRoutes: ["/settings"],

  // Auth protection settings
  auth: {
    // Example Pages that require authentication
    protectedRoutes: ["/dashboard", "/profile", "/admin", "/auth/settings"],

    // Example Pages that should redirect authenticated users away
    unauthedOnlyRoutes: [
      "/auth/sign-in",
      "/auth/sign-up",
      "/auth/forgot-password",
    ],

    // Redirect paths
    loginPath: "/auth/sign-in",
    defaultRedirect: "/",
  },
};

// Regex pattern for 8-digit alphanumeric slugs
const EIGHT_DIGIT_SLUG_REGEX = /^\/([a-zA-Z0-9]{8})$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Handle 8-digit slug rewriting
  if (MIDDLEWARE_CONFIG.enableSlugRewriting) {
    const slugMatch = pathname.match(EIGHT_DIGIT_SLUG_REGEX);
    const isSlugIgnoreRoute = MIDDLEWARE_CONFIG.slugIgnoreRoutes.some((route) =>
      pathname.startsWith(route),
    );
    if (slugMatch && !isSlugIgnoreRoute) {
      const slug = slugMatch[1];
      const rewriteUrl = new URL(
        `${MIDDLEWARE_CONFIG.slugRewritingPath}/${slug}`,
        request.url,
      );

      // Preserve query parameters
      rewriteUrl.search = request.nextUrl.search;

      return NextResponse.rewrite(rewriteUrl);
    }
  }

  // Auth protection logic
  const isProtectedRoute = MIDDLEWARE_CONFIG.auth.protectedRoutes.some(
    (route) => pathname.startsWith(route),
  );

  const isUnauthedOnlyRoute = MIDDLEWARE_CONFIG.auth.unauthedOnlyRoutes.some(
    (route) => pathname.startsWith(route),
  );

  // Check for auth session
  const sessionToken = request.cookies.get(
    `${env.NEXT_PUBLIC_PROJECT_NAME}.session_token`,
  )?.value;
  const isAuthenticated = !!sessionToken;

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL(MIDDLEWARE_CONFIG.auth.loginPath, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from unauthed-only routes
  if (isUnauthedOnlyRoute && isAuthenticated) {
    const redirectPath =
      request.nextUrl.searchParams.get("redirect") ||
      MIDDLEWARE_CONFIG.auth.defaultRedirect;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/data (data fetching)
     * - favicon.ico (favicon file)
     * - Static file extensions
     */
    "/((?!api/|_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|otf|css|js|map)$).*)",
  ],
};
