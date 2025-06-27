import React from "react";
import Image from "next/image";
import clsx from "clsx";
import "./header.scss";

interface HeaderProps {
    containerClassName?: string;
}

export default function Header({ containerClassName }: HeaderProps) {
    return (
        <header className={clsx('app-header',containerClassName)}>
            <Image
                src="/images/company-logo-svg.svg"
                alt="TenByte Logo"
                width={189}
                height={34}
            />
        </header>
    );
}
