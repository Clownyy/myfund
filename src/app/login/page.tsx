"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

interface Login {
    username: string;
    password: string;
}

export default function Login() {
    const { data: session } = useSession();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const handleLogin = async (data: Login) => {
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
            toast.success("Login successful!");
            router.replace("/dashboard");
        }
    };

    useEffect(() => {
        if (session?.accessToken) {
            router.replace("/dashboard");
        }
    }, [session, router]);

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-primary/30 via-background to-background">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-sm "
            >
                <Card className="border-none shadow-lg rounded-2xl backdrop-blur-xl bg-background/70">
                    <CardHeader className="text-center space-y-2">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <div className="mx-auto w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-md">
                                <span className="text-background font-bold text-xl">
                                    F
                                </span>
                            </div>
                        </motion.div>
                        <CardTitle className="text-2xl font-semibold tracking-tight mt-2">
                            Fundster
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Sign in to continue
                        </p>
                    </CardHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)}>
                            <CardContent className="space-y-6">
                                {/* Username */}
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="username">
                                                Username
                                            </Label>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter username"
                                                    {...field}
                                                    className="h-12 rounded-xl text-base"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="h-12 rounded-xl text-base"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl text-base font-semibold shadow-sm hover:shadow-md transition-all"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </CardContent>
                        </form>
                    </Form>
                </Card>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-xs text-muted-foreground mt-6"
                >
                    © 2025 Fundster. All rights reserved.
                </motion.div>
            </motion.div>
        </div>
    );
}
