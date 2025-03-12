import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Languages } from "./app/utils/enums";

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  const withVerification: boolean = true;
  if (!withVerification && request.nextUrl.pathname.includes("verification")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const defaultLocale =
    (request.headers.get("locale") as Languages) || Languages.ARABIC;
  // Step 2: Create and call the next-intl middleware (example)o
  const handleI18nRouting = createMiddleware({
    locales: [Languages.ARABIC, Languages.ENGLISH],
    defaultLocale: Languages.ARABIC,
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.headers.set("locale", defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
