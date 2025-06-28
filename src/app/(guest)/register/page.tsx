import React from "react";
import RegistrationForm from "@/components/forms/registration";
import type { RegistrationData } from "@/schemas/user.schema";
import AxiosServices from "@/services/axios.service";
import APIRoutes from "@/config/api-routes";
import { redirect } from "next/navigation";
import { appRoutes } from "@/config/app-routes";
import Link from "next/link";

export default function Page() {
    async function handleRegistration(values: RegistrationData) {
        "use server";
        const { data } = await AxiosServices.post(APIRoutes.register, values);
        console.log("Registration successful:", data);
        redirect(appRoutes.dashboard);
    }

    return (
        <section className="flex justify-center items-center h-full">
            <div className="px-2 max-w-[400px]">
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
