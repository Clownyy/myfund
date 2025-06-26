import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { genRandomString } from "@/lib/utils";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt" as const,
        maxAge: 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your_username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                });

                const user = await res.json();
                if (!res.ok) {
                    throw new Error(user.detail);
                }
                if (res.ok && user.id_token) {
                    const resUserInfo = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}account`, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${user.id_token}` },
                    })
                    const userInfo = await resUserInfo.json();

                    const resMenu = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}menus/list`, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${user.id_token}` },
                    })

                    const menuInfo = await resMenu.json();
                    return {
                        id: crypto.randomUUID(),
                        token: user.id_token,
                        userInfo: userInfo,
                        menuInfo: menuInfo
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.userInfo = {
                    username: user.userInfo.username,
                    firstName: user.userInfo.firstName,
                    lastName: user.userInfo.lastName,
                    email: user.userInfo.email,
                    imageUrl: user.userInfo.imageUrl,
                    authorities: genRandomString(5) + btoa(user.userInfo.authorities) + genRandomString(7),
                };
                token.menuInfo = user.menuInfo;
                token.id_token = user.token;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.id_token;
            session.user = token.userInfo;
            session.menus = token.menuInfo;
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
};