import React from "react";
import GuestLayout from "@/components/layouts/guest-layout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <GuestLayout>{children}</GuestLayout>;
}
