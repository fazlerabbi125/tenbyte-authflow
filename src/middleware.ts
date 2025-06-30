import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { appRoutes } from "./config/app-routes";
import { getSessionData } from "./services/session.service";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const { user } = await getSessionData({ res, req });
    if (!user && req.nextUrl.pathname === appRoutes.dashboard) {
        return NextResponse.redirect(new URL("/403", req.url));
    }
    if (user && req.nextUrl.pathname in [appRoutes.login, appRoutes.register]) {
        return NextResponse.redirect(new URL(appRoutes.dashboard, req.url));
    }
    return res;
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
