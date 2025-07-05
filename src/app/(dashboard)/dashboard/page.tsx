import type { Profile } from "@/store/auth.slice";
import AxiosServices from "@/services/axios.service";
import APIRoutes from "@/config/api-routes";
import { AxiosError } from "axios";
import DashboardClient from "./client";
import { deleteSession } from "@/services/session.service";

export default async function Page() {
    let profile: Profile | undefined;
    let error = "";
    try {
        const { data } = await AxiosServices.get<{ result: Profile }>(APIRoutes.profile);
        console.log(data);
        profile = data.result;
    } catch (err: any) {
        error = (err instanceof AxiosError && err.response?.data?.message) || err.message;
    }
    if (error) return <div className="p-4">{error}</div>;

    async function logOutUser() {
        "use server";
        await deleteSession();
    }
    return (
        <section className="p-4">
            <div>
                Welcome to your dashboard,{" "}
                {[profile?.first_name, profile?.last_name].filter((elem) => elem).join(" ")}
            </div>
            <DashboardClient logout={logOutUser}/>
        </section>
    );
}
