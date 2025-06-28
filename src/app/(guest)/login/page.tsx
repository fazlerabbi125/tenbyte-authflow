import LoginForm from "@/components/forms/login";
import APIRoutes from "@/config/api-routes";
import { appRoutes } from "@/config/app-routes";
import { LoginData } from "@/schemas/user.schema";
import AxiosServices from "@/services/axios.service";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
    async function handleLogin(values: LoginData) {
        "use server";
        const { data } = await AxiosServices.post(APIRoutes.login, values);
        redirect(appRoutes.dashboard);
    }
    return (
        <section className="flex justify-center pt-[7.5%]">
            <div className="px-2 max-w-[400px]">
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">Welcome Back</h1>
                    <div className="text-sm tracking-[-1%] text-secondary">
                        Login to your demo account
                    </div>
                </div>
                <LoginForm loginHandler={handleLogin} />
                <div>
                    <div className="text-sm text-center	tracking-[-1%] text-primary mt-6">
                        New to Demo?{" "}
                        <Link href={appRoutes.register} className="text-brand-300 underline">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
