"use server";
import { cookies } from "next/headers";
import { sessionCookieConfig } from "@/config/session";
import type { Session } from "@/store/auth.store";
import type { NextRequest, NextResponse } from "next/server";
import { deleteCookie, getCookie, OptionsType, setCookie } from "cookies-next";

interface MiddlewareArgs {
    res: NextResponse;
    req: NextRequest;
}

export async function getSessionData(middlewareArgs?: MiddlewareArgs) {
    let cookieStore: string | undefined;
    if (typeof window !== "undefined") {
        cookieStore = await getCookie(sessionCookieConfig.cookieName);
    } else if (middlewareArgs) {
        cookieStore = await getCookie(sessionCookieConfig.cookieName, middlewareArgs);
    } else {
        cookieStore = await getCookie(sessionCookieConfig.cookieName, { cookies });
    }
    return JSON.parse(cookieStore || "{}") as Session;
}

export async function setSessionData(data: Partial<Session>, middlewareArgs?: MiddlewareArgs) {
    const session = await getSessionData();
    for (const key in data) {
        (session as any)[key] = data[key as keyof Session];
    }
    if (typeof window !== "undefined") {
        await setCookie(
            sessionCookieConfig.cookieName,
            session,
            sessionCookieConfig.cookieOptions as OptionsType
        );
    } else if (middlewareArgs) {
        await setCookie(sessionCookieConfig.cookieName, session, {
            ...middlewareArgs,
            ...sessionCookieConfig.cookieOptions,
        });
    } else {
        await setCookie(sessionCookieConfig.cookieName, session, {
            cookies,
            ...sessionCookieConfig.cookieOptions,
        });
    }
}

export async function deleteSession(middlewareArgs?: MiddlewareArgs) {
    if (typeof window !== "undefined") await deleteCookie(sessionCookieConfig.cookieName);
    else if (middlewareArgs) await deleteCookie(sessionCookieConfig.cookieName, middlewareArgs);
    else await deleteCookie(sessionCookieConfig.cookieName, { cookies });
}
