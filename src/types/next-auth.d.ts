// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: UserInfo;
        menus: MenuInfo[]
    }

    interface MenuInfo {
        menuCode: string,
        title: string,
        url: string,
        icon: string,
        isAdmin: boolean
    }

    interface UserInfo {
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        imageUrl: string,
        authorities: string
    }

    interface JWT {
        accessToken?: string;
        user?: User;
    }
}
