"use client";
import type { Profile } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { logOutUser } from "./action";
import { Button } from "@/components/ui/button";
import AxiosServices from "@/services/axios.service";
import APIRoutes from "@/config/api-routes";

export default function Page() {
    const [profile, setProfile] = useState<Profile | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        let timeout: boolean = false;
        const loadData = async () => {
            if (timeout) return;
            try {
                setIsLoading(true);
                setError("");
                const { data } = await AxiosServices.get<Profile>(APIRoutes.profile);
                setProfile(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
        return () => {
            timeout = true;
        };
    }, []);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <section>
            <div>Welcome to your dashboard, {profile?.first_name || ""}</div>
            <Button className="text-white bg-red-500" onClick={() => logOutUser()}>
                Logout
            </Button>
        </section>
    );
}
