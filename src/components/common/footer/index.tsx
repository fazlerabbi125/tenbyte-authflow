import React from "react";
import clsx from "clsx";
import "./footer.scss";

interface FooterProps {
    containerClassName?: string;
}

export default function Footer({ containerClassName }: FooterProps) {
    return (
        <footer className={clsx("app-footer",containerClassName)}>
            <div className="text-xs text-secondary">By signing in, you agree to our <span className="font-medium underline font-medium text-primary">Privacy Policy</span> and <span className="font-medium underline font-medium text-primary">Terms of Use</span></div>
        </footer>
    );
}
