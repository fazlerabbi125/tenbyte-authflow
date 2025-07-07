import { NextRequest } from "next/server";
import APIRoutes from "@/config/api-routes";
import type { RefreshResponse } from "@/lib/types/response/auth.res";
import AxiosServices from "@/services/axios.service";
import { AxiosError, HttpStatusCode } from "axios";
import { deleteSession, setSessionData } from "@/services/session.service";

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
        await setSessionData({ refresh_token });
        return Response.json({ message: "Tokens successfully renewed", access_token });
    } catch (err: any) {
        await deleteSession();
        if (err instanceof AxiosError) {
            return Response.json(
                {
                    message: err.response?.data?.message ? err.response.data.message : err.message,
                },
                { status: err.status || HttpStatusCode.InternalServerError }
            );
        }
        return Response.json(
            {
                message: err.message,
            },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}
