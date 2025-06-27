import React from "react";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Image from "next/image";
import "./guest.layout.scss";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="guest-layout">
            <Header containerClassName="guest-layout__header" />
            <main className="guest-layout__main">{children}</main>
            <Footer containerClassName="guest-layout__footer" />
            <div className="guest-layout__photo">
                <div className="size-full relative">
                    <Image
                        src="/images/signup.png"
                        alt="Guest Layout Photo"
                        fill
                        className="rounded-[8px]"
                    />
                </div>
            </div>
        </div>
    );
}
