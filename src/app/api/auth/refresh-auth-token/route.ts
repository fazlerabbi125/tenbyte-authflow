import { NextRequest } from "next/server";
import APIRoutes from "@/config/api-routes";
import type { RefreshResponse } from "@/lib/types/response/auth.res";
import AxiosServices from "@/services/axios.service";
import { HttpStatusCode } from "axios";
import { unstable_update, signOut } from "@/auth";
import { appRoutes } from "@/config/app-routes";

export async function POST(req: NextRequest) {
    const { oldRefreshToken } = await req.json();
    if (!oldRefreshToken)
        return Response.json(
            { message: "Refresh token is missing" },
            { status: HttpStatusCode.BadRequest }
        );
    try {
        const {
            data: { access_token, refresh_token },
        } = await AxiosServices.post<RefreshResponse>(APIRoutes.refreshToken, {
            refresh_token: oldRefreshToken,
            remember_me: true,
        });
        await unstable_update({ refresh_token });
        return Response.json({ message: "Tokens successfully renewed", access_token });
    } catch (err: any) {
        await signOut({ redirect: false });
        return Response.redirect(new URL(appRoutes.login, req.url));
    }
}
