import RegistrationForm from "@/components/forms/registration";
import type { RegistrationData } from "@/schemas/user.schema";
import AxiosServices from "@/services/axios.service";
import APIRoutes from "@/config/api-routes";
import { appRoutes } from "@/config/app-routes";
import Link from "next/link";
import type { LoginResponse } from "@/lib/response/auth";
import { setSessionData } from "@/services/session.service";

export default function Page() {
    async function handleRegistration(values: RegistrationData) {
        "use server";
        const {
            data: { access_token, refresh_token, result },
        } = await AxiosServices.post<LoginResponse>(APIRoutes.register, values);
        await setSessionData({
            refresh_token,
            user: result,
        });
        return {
            access_token,
            redirectUrl: appRoutes.dashboard,
        };
    }

    return (
        <section className="flex justify-center items-center h-full">
            <div className="px-2 max-w-[420px]">
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">Get Started with Vidinfra</h1>
                    <div className="text-sm tracking-[-1%] text-secondary">
                        Stream, host, and manage videos effortlessly!
                    </div>
                </div>
                <RegistrationForm registrationHandler={handleRegistration} />
                <div>
                    <div className="text-sm text-center	tracking-[-1%] text-primary mt-6">
                        Already have an account?{" "}
                        <Link href={appRoutes.login} className="text-brand-300 underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
