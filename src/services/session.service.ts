import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionCookieOptions } from "@/config/session";
import { Session } from "@/store/auth.store";

export async function getSession() {
    return await getIronSession<Session>(await cookies(), sessionCookieOptions);
}

export async function setSessionData(data: Partial<Session>) {
    const session = await getIronSession<Session>(await cookies(), sessionCookieOptions);
    for (const key in data) {
        (session as any)[key] = data[key as keyof Session];
    }
    await session.save();
}

export async function deleteSession() {
    const session = await getIronSession<Session>(await cookies(), sessionCookieOptions);
    session.destroy();
}
