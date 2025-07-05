"use client";
import { Button } from "@/components/ui/button";

export default function DashboardClient({ logout }: { logout: () => void | Promise<void> }) {
    return (
        <Button className="text-white bg-red-500" onClick={logout}>
            Logout
        </Button>
    );
}
