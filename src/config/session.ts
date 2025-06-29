interface SessionCookieConfig {
    cookieName: string;
    cookieOptions?: Cookies.CookieAttributes;
}
export const sessionCookieConfig: SessionCookieConfig = {
    cookieName: process.env.NEXT_PUBLIC_SESSION_COOKIE || "tenbyte-authflow-session",
    cookieOptions: {
        // secure: true,
        // httpOnly: true,
    },
};
