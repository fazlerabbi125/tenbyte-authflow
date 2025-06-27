"use client";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import "./registration.scss";

export interface RegistrationData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

interface RegistrationFormProps {
    onSubmit: (state: RegistrationData) => RegistrationData | Promise<RegistrationData>;
}

const initialRegistrationState: RegistrationData = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
};

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
    const [state, formAction, isPending] = useActionState(onSubmit, initialRegistrationState);
    return (
        <section className="registration-form">
            <div className="px-2">
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">Get Started with Vidinfra</h1>
                    <div className="text-sm tracking-[-1%] text-secondary">
                        Stream, host, and manage videos effortlessly!
                    </div>
                </div>
                <form className="mt-[25px] space-y-3">
                    <div className="registration-form__input-group gap-y-2">
                        <Label className="mb-[4px]">Full Name</Label>
                        <div className="registration-form__input-combined">
                            <Input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="First name"
                            />
                            <Input
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder="Last name"
                            />
                        </div>
                    </div>
                    <div className="registration-form__input-group gap-y-2">
                        <Label htmlFor="email" className="mb-[4px]">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div className="registration-form__input-group gap-y-2">
                        <Label htmlFor="email" className="mb-[4px]">
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="example@gmail.com"
                        />
                        <div className="text-[12px] leading-[16px] text-tertiary">
                            Password must be 8+ chars & include special characters (e.g. @, #, $)
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="registration-form__input__btn--register text-sm tracking-[-2%]"
                    >
                        Register
                    </Button>
                </form>
                <div className="registration-form__input__oauth">
                    <div className="registration-form__input__oauth-text text-sm tracking-[-2%]">
                        or continue with
                    </div>

                    <div className="registration-form__input__btn-group mt-[1rem] text-sm">
                        <Button>
                            <Image
                                src={"/images/google-svg.svg"}
                                alt="google"
                                width={20}
                                height={20}
                            />
                            <span>Google</span>
                        </Button>
                        <Button>
                            <Image
                                src={"/images/github-svg.svg"}
                                alt="github"
                                width={20}
                                height={20}
                            />
                            <span>Github</span>
                        </Button>
                        <Button>
                            <Image src={"/images/okta-svg.svg"} alt="okta" width={20} height={20} />
                            <span>Okta</span>
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="text-sm text-center	tracking-[-1%] text-primary mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-brand-300 underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
