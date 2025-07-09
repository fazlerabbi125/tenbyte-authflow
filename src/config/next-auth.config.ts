import { NextAuthConfig } from "next-auth";
import { appRoutes } from "./app-routes";
import { NextResponse } from "next/server";
import { sessionCookieConfig } from "./session.config";

export const nextAuthConfig = {
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: appRoutes.login,
    },
    cookies: {
        sessionToken: {
            name: sessionCookieConfig.cookieName || "authjs.session-token",
            // options: { secure: true, httpOnly: true },
        },
    },
    session: {
        maxAge: 60 * 60 * 24 * 365,
    },
    callbacks: {
        authorized({ request, auth }) {
            if (!auth?.user && request.nextUrl.pathname === appRoutes.dashboard) {
                return NextResponse.redirect(new URL(request.url, request.url));
            } else if (
                auth?.user &&
                [appRoutes.login, appRoutes.register].includes(request.nextUrl.pathname)
            ) {
                return NextResponse.redirect(new URL("/403", request.url));
            }
            return true;
        },
        jwt({ token, user, trigger, session }) {
            if (trigger === "update" && session) {
                for (const key in session) {
                    token[key] = session[key];
                }
            }
            // Only store refresh token and user info in JWT, not access token
            else if (user) {
                token.refresh_token = user.refresh_token;
                token.user = user.userInfo;
                // Store access token in Zustand store (memory) for client-side
            }
            return token;
        },
        session({ token, session }) {
            // console.log("Session callback", { token, session, user });
            session.user = token.user;
            session.refresh_token = token.refresh_token;
            return session;
        },
    },
    events: {
        async signIn({user}) {
            (await import("@/store")).useAuthStore.getState().setToken(user.access_token);
        },
        async signOut() {
            (await import("@/store")).useAuthStore.getState().clearToken();
        },
    },
    providers: [],
} satisfies NextAuthConfig;
