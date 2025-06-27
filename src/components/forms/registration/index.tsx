"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./registration.scss";

const registrationSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include special characters"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
    handleSubmit: (values: RegistrationData) => void | Promise<void>;
}

export default function RegistrationForm({ handleSubmit }: RegistrationFormProps) {
    const form = useForm<z.infer<typeof registrationSchema>>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
        },
    });
    function onSubmit(values: RegistrationData) {
        console.log(values);
    }
    return (
        <section className="registration-form">
            <div className="px-2">
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">Get Started with Vidinfra</h1>
                    <div className="text-sm tracking-[-1%] text-secondary">
                        Stream, host, and manage videos effortlessly!
                    </div>
                </div>
                <Form {...form}>
                    <form className="mt-[25px] space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="registration-form__input-group gap-y-2">
                            <Label className="mb-[4px]">Full Name</Label>
                            <div className="registration-form__input-combined">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem className="registration-form__input-combined-item">
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="First name"
                                                    className="rounded-r-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem className="registration-form__input-combined-item">
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Last name"
                                                    className="rounded-l-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="registration-form__input-group gap-y-2">
                            <Label className="mb-[4px]">Email Address</Label>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="example@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="registration-form__input-group gap-y-2">
                            <Label className="mb-[4px]">Password</Label>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="example@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-[12px] leading-[16px] text-tertiary">
                                            Password must be 8+ chars & include special characters
                                            (e.g. @, #, $)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="registration-form__input__btn--register text-sm tracking-[-2%]"
                            disabled={form.formState.isSubmitting}
                        >
                            Register
                        </Button>
                    </form>
                </Form>
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
