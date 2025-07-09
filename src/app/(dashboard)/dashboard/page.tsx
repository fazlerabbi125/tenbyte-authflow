import type { Profile } from "@/store/auth.slice";
import AxiosServices from "@/services/axios.service";
import APIRoutes from "@/config/api-routes";
import { AxiosError } from "axios";
import DashboardClient from "./client";
import { signOut } from "@/auth";

export default async function Page() {
    let profile: Profile | undefined;
    let error = "";
    try {
        const { data } = await AxiosServices.get<{ result: Profile }>(APIRoutes.profile);
        profile = data.result;
    } catch (err: any) {
        error = (err instanceof AxiosError && err.response?.data?.message) || err.message;
    }
    async function logOutUser() {
        "use server";
        await AxiosServices.post(APIRoutes.logout);
        await signOut({ redirect: false });
    }
    return (
        <section className="p-4">
            {error ? (
                <div>{error}</div>
            ) : (
                <div className="mb-2">
                    Welcome to your dashboard,{" "}
                    {[profile?.first_name, profile?.last_name].filter((elem) => elem).join(" ")}
                </div>
            )}
            <DashboardClient handleLogout={logOutUser} />
        </section>
    );
}
