"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginData } from "@/schemas/user.schema";
import { useLSStore } from "@/store";
import { toast } from "sonner";
import "./login-form.scss";

interface LoginFormProps {
    loginHandler: (values: LoginData) => Promise<{
        access_token: string;
        redirectUrl?: string;
    }>;
}

export default function LoginForm({ loginHandler }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const setToken = useLSStore((state) => state.setToken);
    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginData) {
        try {
            const { access_token, redirectUrl } = await loginHandler(data);
            form.reset();
            setToken(access_token);
            if (redirectUrl) router.push(redirectUrl);
        } catch (error: any) {
            return toast(`Login error: ${error.message}`);
        }
    }

    return (
        <>
            <Form {...form}>
                <form className="mt-[25px] space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="login-form__input-group gap-y-2">
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
                    <div className="login-form__input-group gap-y-2">
                        <Label className="mb-[4px]">Password</Label>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="••••••••"
                                                className="pr-9 truncate"
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <Image
                                                src={"/images/Eye.svg"}
                                                alt="toggle password visibility"
                                                width={20}
                                                height={20}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="login-form__input__btn--register text-sm tracking-[-2%]"
                        disabled={form.formState.isSubmitting}
                    >
                        Sign In
                    </Button>
                </form>
            </Form>
            <div className="login-form__input__oauth">
                <div className="login-form__input__oauth-text text-sm tracking-[-2%]">
                    or continue with
                </div>

                <div className="login-form__input__btn-group mt-[1rem] text-sm">
                    <Button>
                        <Image src={"/images/google-svg.svg"} alt="google" width={20} height={20} />
                        <span>Google</span>
                    </Button>
                    <Button>
                        <Image src={"/images/github-svg.svg"} alt="github" width={20} height={20} />
                        <span>Github</span>
                    </Button>
                    <Button>
                        <Image src={"/images/okta-svg.svg"} alt="okta" width={20} height={20} />
                        <span>Okta</span>
                    </Button>
                </div>
            </div>
        </>
    );
}
