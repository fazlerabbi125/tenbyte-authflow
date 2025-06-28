import React from "react";
import RegistrationForm from "@/components/forms/registration";
import type { RegistrationData } from "@/schemas/user.schema";
import AxiosServices from "@/services/axios.service";
import APIRoutes from "@/config/api-routes";
import { redirect } from "next/navigation";
import { appRoutes } from "@/config/app-routes";

export default function Page() {
    async function handleRegistration(values: RegistrationData) {
        "use server";
        try {
            const { data } = await AxiosServices.post(APIRoutes.register, values);
            console.log("Registration successful:", data);
            redirect(appRoutes.dashboard);
        } catch (error) {
            throw error; // Re-throw to handle it in the component if needed
        }
    }

    return <RegistrationForm handleSubmit={handleRegistration} />;
}
