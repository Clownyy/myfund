"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
})

const otpSchema = z.object({
    otp: z.string().min(6, "Invalid OTP"),
})

export default function Login() {
    const { data: session, status } = useSession();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const formOtp = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const handleLogin = async (data: any) => {
        setLoading(true);
        const res = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: false,
        });
        setLoading(false);
        if (res?.error) {
            toast.error("Login failed, username or password is incorrect");
        } else {
            toast.success("Login successful!")
            router.replace("/dashboard");
        }
    };

    useEffect(() => {
        if (session?.accessToken) {
            router.replace("/dashboard");
        }
    }, [session, router]);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[400px]">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">My Funds</CardTitle>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)}>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="username">Username</Label>
                                            <FormField
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="Username" type="text" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Password</Label>
                                            </div>
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="Password" type="password" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={isLoading}>
                                            {isLoading ? "Logging in..." : "Login"}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
