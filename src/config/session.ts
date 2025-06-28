import type { SessionOptions } from "iron-session";

export const sessionCookieOptions: SessionOptions = {
    cookieName: process.env.NEXT_PUBLIC_SESSION_COOKIE || "tenbyte-authflow-session",
    password: process.env.NEXT_PUBLIC_SESSION_KEY || "",
    cookieOptions: {
        // secure: true,
        // httpOnly: true,
    },
};
