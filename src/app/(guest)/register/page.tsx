import React from "react";
import RegistrationForm, { RegistrationData } from "@/components/forms/registration";
import AxiosServices from "@/services/axios.service";
import APIRoutes from "@/config/api-routes";

export default function Page() {
    async function handleRegistration(values: RegistrationData) {
        "use server";
        const { data } = await AxiosServices.post(APIRoutes.register, values);
        console.log("Registration successful:", data);
    }

    return <RegistrationForm handleSubmit={handleRegistration} />;
}
