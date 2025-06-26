"use client"

import * as React from "react"
import {
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconFolder,
	IconHelp,
	IconInnerShadowTop,
	IconListDetails,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"

const navSecondary = [
	{
		title: "Settings",
		url: "#",
		icon: IconSettings,
	},
	{
		title: "Get Help",
		url: "#",
		icon: IconHelp,
	},
	{
		title: "Search",
		url: "#",
		icon: IconSearch,
	},
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

	const data = useSession().data;
	const user = data?.user;
	const menu = data?.menus;
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-5 data-[size=sm]/menu-button:top-1 data-[size=default]/menu-button:top-1.5"
						>
							<a href="#">
								<IconInnerShadowTop className="!size-5" />
								<span className="text-base font-semibold">My Funds</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={menu} />
				<NavSecondary items={navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	)
}
