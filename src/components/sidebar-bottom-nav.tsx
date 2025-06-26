"use client"

import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { LucideIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

export function SidebarBottomNav({
    className,
    ...props
}: React.ComponentProps<"nav">) {
    const [isClient, setIsClient] = useState(false)
    const session = useSession();
    const pathname = usePathname();

    useEffect(() => setIsClient(true), [])
    if (!isClient) return null

    const menu = session.data?.menus
    const menuList = menu?.filter((menuItem) => !menuItem.isAdmin)

    return (
        <nav
            data-slot="sidebar-bottom-nav"
            className={cn(
                "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-md backdrop-blur-md bg-background/80 border border-primary/20 px-3 py-2",
                "flex justify-around gap-1 w-[90%] max-w-xs md:hidden",
                className
            )}
            {...props}
        >
            {menuList?.map((item) => {
                const Icon =
                    LucideIcons[item.icon as keyof typeof LucideIcons] as LucideIcon ??
                    LucideIcons.Circle
                const isActive = pathname === item.url

                return (
                    <Button
                        asChild
                        key={item.menuCode}
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "rounded-full p-0 aspect-square h-11 w-11",
                            isActive
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "text-muted-foreground hover:text-primary hover:bg-accent"
                        )}
                    >
                        <Link href={item.url}>
                            <Icon className="h-5 w-5" />
                        </Link>
                    </Button>
                )
            })}
        </nav>
    )
}


// "use client";

// import { HomeIcon, PanelLeftIcon, UserIcon } from "lucide-react"
// import { useSidebar } from "./ui/sidebar"
// import { Button } from "./ui/button"
// import { cn } from "@/lib/utils"
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import * as LucideIcons from "lucide-react";
// import { LucideIcon } from "lucide-react";
// import { usePathname } from "next/navigation";

// export function SidebarBottomNav({
//     className,
//     ...props
// }: React.ComponentProps<"nav">) {
//     const data = useSession().data;
//     const menu = data?.menus;
//     const menuList = menu?.filter((menuItem) => !menuItem.isAdmin);
//     const pathname = usePathname();

//     return (
//         <nav
//             data-slot="sidebar-bottom-nav"
//             className={cn(
//                 "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 rounded-2xl shadow-md backdrop-blur-md bg-background/80 border border-primary/20 px-4 py-2",
//                 "flex justify-around gap-1 w-[90%] max-w-md md:hidden", // Floating style
//                 className
//             )}
//             {...props}
//         >
//             <div className="container mx-auto flex items-center justify-around">
//                 {menuList && menuList.map((item) => {
//                     const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as LucideIcon ?? LucideIcons.Circle;
//                     const isActive = pathname === item.url;
//                     const words = item.title.trim().split(" ");
//                     const lastWord = words[words.length - 1];

//                     return (
//                         <Button
//                             asChild
//                             key={item.menuCode}
//                             variant="ghost"
//                             className={`flex-1 flex-col h-auto hover:text-primary/90 hover:bg-accent ${isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : ''}`}
//                         >
//                             <Link href={item.url}>
//                                 <Icon />
//                                 <span className="text-xs">{lastWord}</span>
//                             </Link>
//                         </Button>
//                     )
//                 })}
//             </div>
//         </nav>
//     )
// }
