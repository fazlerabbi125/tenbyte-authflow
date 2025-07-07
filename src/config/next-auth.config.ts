import { NextAuthConfig } from "next-auth";
import { appRoutes } from "./app-routes";

export const nextAuthConfig = {
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: appRoutes.login,
    },
    // cookies: {
    //     sessionToken: {
    //         name: sessionCookieConfig.cookieName,
    //         options: { secure: true, httpOnly: true },
    //     },
    // },
    session: {
        maxAge: 60 * 60 * 24 * 365,
    },
    callbacks: {
        authorized({ request, auth }) {
            console.log("inside authorized callback");
            if (!auth?.user && request.nextUrl.pathname === appRoutes.dashboard) {
                return false;
            }
            if (auth?.user && request.nextUrl.pathname in [appRoutes.login, appRoutes.register]) {
                return Response.redirect(new URL(appRoutes.dashboard, request.url));
            }
            return true;
        },
        jwt({ token, user, trigger }) {
            // console.log("JWT Callback:", { token, user });
            // Only store refresh token and user info in JWT, not access token
            if (user) {
                token.refresh_token = user.refresh_token;
                token.user = user.userInfo;
                // Store access token in Zustand store (memory) for client-side

                // if (typeof window !== "undefined" && user.access_token) {
                //     // Import dynamically to avoid issues during SSR
                //     import("../store")
                //         .then(({ useAuthStore }) => {
                //             useAuthStore.getState().setToken(user.access_token);
                //         })
                //         .catch(console.error);
                // }
            }
            return token;
        },
        session({ token, session, user }) {
            // console.log("Session callback", { token, session, user });
            session.user = token.user;
            session.refresh_token = token.refresh_token;
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
