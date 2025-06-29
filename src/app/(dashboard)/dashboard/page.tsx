import type { Profile } from "@/store/auth.store";
import AxiosServices from "@/services/axios.service";
import APIRoutes from "@/config/api-routes";

export default async function Page() {
    let profile: Profile | undefined;
    let error = "";
    try {
        const { data } = await AxiosServices.get<{ result: Profile }>(APIRoutes.profile);
        console.log(data);
        profile = data.result;
    } catch (err: any) {
        error = err.message;
    }
    if (error) return <div>{error}</div>;
    return (
        <section>
            <div>Welcome to your dashboard, {profile?.first_name || ""}</div>
            {/* <Button className="text-white bg-red-500" onClick={() => logOutUser()}>
                Logout
            </Button> */}
        </section>
    );
}
