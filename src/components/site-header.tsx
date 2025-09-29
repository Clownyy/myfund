"use client";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./dark-mode";
import { formatCurrency, getInitials } from "@/lib/utils";
import { useQueryApi } from "@/hooks/use-query";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BellIcon, Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function SiteHeader() {
	const session = useSession().data;
	const userInfo = session?.user;
	const { data, isLoading, error } = useQueryApi('cash-pos', 'cash-pos', 'GET');
	const { data: asset, isLoading: isLoadingAsset } = useQueryApi('asset', 'asset', 'GET');
	const { data: currInvoice, isLoading: isLoadingCurrInvoice } = useQueryApi('current-invoice', 'current-invoice', 'GET');
	const [showBalance, setShowBalance] = useState(false);
	const [showAsset, setShowAsset] = useState(false);


	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="mx-4 sm:mx-8 flex w-full h-14 items-center md:hidden">
				<div className="flex items-center space-x-2 lg:space-x-0">
					<Avatar className="h-10 w-10">
						<AvatarImage src="#" alt={`${userInfo?.firstName} ${userInfo?.lastName}`} />
						<AvatarFallback>{getInitials(userInfo?.firstName!, userInfo?.lastName!)}</AvatarFallback>
					</Avatar>
					<div>
						<span className="block font-medium text-sm">
							Muhammad Bafaqih
						</span>
						<span className="block text-xs text-muted-foreground">
							{isLoadingAsset && <Skeleton className="h-4 w-[50px] hidden md:flex" />}
							{!isLoadingAsset &&
								<span>{`Your Asset: ${showAsset ? formatCurrency(asset) : "••••••"}`}</span>
							}
							<button
								className="ml-1 inline-flex items-center text-xs text-primary"
								onClick={() => navigator.clipboard.writeText("12312312321321")}
							>
								<Copy className="h-2 w-2" />
							</button>
						</span>
					</div>
				</div>
				<div className="flex flex-1 items-center justify-end">
					<div>
						<ModeToggle />
					</div>
					<div className="relative">
						<Button variant="ghost" className="relative" size="icon">
							<BellIcon className="h-5 w-5" />
							<span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
								2
							</span>
						</Button>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 hidden md:flex">
				<SidebarTrigger className="-ml-1 hidden md:flex" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4 hidden md:flex"
				/>
				{isLoading && <Skeleton className="h-4 w-[50px] hidden md:flex" />}
				{!isLoading &&
					<h1 className="text-gray font-medium hidden md:flex">{`Balance: ${showBalance ? formatCurrency(data.amount ?? 0) : "••••••"}`}</h1>
				}
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setShowBalance(!showBalance)}
				>
					{showBalance ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
				</Button>
				<Separator
					orientation="vertical"
					className=" mx-2 data-[orientation=vertical]:h-4 hidden md:flex"
				/>
				{isLoadingAsset && <Skeleton className="h-4 w-[50px] hidden md:flex" />}
				{!isLoadingAsset &&
					<h1 className=" text-gray font-medium hidden md:flex">{`Your Asset: ${showAsset ? formatCurrency(asset) : "••••••"}`}</h1>
				}
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setShowAsset(!showAsset)}
				>
					{showAsset ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
				</Button>
				<Separator
					orientation="vertical"
					className=" mx-2 data-[orientation=vertical]:h-4 hidden md:flex"
				/>
				{isLoadingCurrInvoice && <Skeleton className="h-4 w-[50px] hidden md:flex" />}
				{!isLoadingCurrInvoice &&
					<h1 className=" text-gray font-medium hidden md:flex">{`Your Invoice: ${formatCurrency(currInvoice)}`}</h1>
				}
				<div className="ml-auto flex items-center ">
					<div>
						<ModeToggle />
					</div>
					<div className="relative">
						<Button variant="ghost" className="relative" size="icon">
							<BellIcon className="h-5 w-5" />
							<span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
								2
							</span>
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
