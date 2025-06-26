"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"

import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuInfo } from "next-auth";

export function NavMain({
	items,
}: {
	items: MenuInfo[] | undefined
}) {
	const pathname = usePathname();
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				{/* <SidebarMenu>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							tooltip="Quick Create"
							className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
						>
							<IconCirclePlusFilled />
							<span>Quick Create</span>
						</SidebarMenuButton>
						<Button
							size="icon"
							className="size-8 group-data-[collapsible=icon]:opacity-0"
							variant="outline"
						>
							<IconMail />
							<span className="sr-only">Inbox</span>
						</Button>
					</SidebarMenuItem>
				</SidebarMenu> */}
				<SidebarMenu>
					{items?.map((item) => {
						const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as LucideIcon ?? LucideIcons.Circle;
						const isActive = pathname === item.url;

						return (
							<SidebarMenuItem key={item.title}>
								<Link href={item.url}>
									<SidebarMenuButton
										tooltip={item.title}
										className={`${isActive ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "hover:bg-accent"} min-w-8 h-10 mb-1 duration-200 ease-linear cursor-pointer`}
									>
										{Icon && <Icon className="size-8" />}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</Link>
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
