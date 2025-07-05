import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import "./header.scss";

interface HeaderProps {
    containerClassName?: string;
}

export default function Header({ containerClassName }: HeaderProps) {
    return (
        <header className={cn('app-header',containerClassName)}>
            <Image
                src="/images/company-logo-svg.svg"
                alt="TenByte Logo"
                width={189}
                height={34}
            />
        </header>
    );
}
