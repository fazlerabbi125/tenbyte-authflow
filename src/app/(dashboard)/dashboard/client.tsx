"use client";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { appRoutes } from "@/config/app-routes";
import { useRouter } from "next/navigation";

export default function DashboardClient({
    handleLogout,
}: {
    handleLogout: () => void | Promise<void>;
}) {
    const router = useRouter();
    const logout = async () => {
        try {
            await handleLogout();
            router.push(appRoutes.login);
        } catch (error: any) {
            return toast.error(
                (error instanceof AxiosError && error.response?.data?.message) || error.message
            );
        }
    };
    return (
        <Button className="text-white bg-red-500" onClick={logout}>
            Logout
        </Button>
    );
}
