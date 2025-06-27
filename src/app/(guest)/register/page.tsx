import React from "react";
import RegistrationForm, { RegistrationData } from "@/components/forms/registration";

export default function Page() {
    async function handleRegistration(state: RegistrationData) {
        "use server";
        // Handle registration logic here
        return state;
    }

    return <RegistrationForm onSubmit={handleRegistration}/>;
}
