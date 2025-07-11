"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationSchema, type RegistrationData } from "@/schemas/user.schema";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { toast } from "sonner";
import { AxiosError } from "axios";
import "./registration-form.scss";

interface RegistrationFormProps {
    registrationHandler: (values: RegistrationData) => Promise<{
        access_token: string;
        redirectUrl?: string;
    }>;
}

export default function RegistrationForm({ registrationHandler }: RegistrationFormProps) {
    const router = useRouter();
    const setToken = useAuthStore((state) => state.setToken);
    const form = useForm<RegistrationData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            newsletter: true,
        },
    });
    async function onSubmit(data: RegistrationData) {
        try {
            const { access_token, redirectUrl } = await registrationHandler(data);
            form.reset();
            setToken(access_token);
            if (redirectUrl) router.push(redirectUrl);
        } catch (error: any) {
            return toast.error(
                `Registration error: ${
                    (error instanceof AxiosError && error.response?.data?.message) || error.message
                }`
            );
        }
    }
    return (
        <>
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
                                        Password must be 8+ chars & include special characters (e.g.
                                        @, #, $)
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
