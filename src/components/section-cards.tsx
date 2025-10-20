"use client";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { useQueryApi } from "@/hooks/use-query";
import { Skeleton } from "./ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { Eye, EyeOff, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function SectionCards() {
	const { data: asset, isLoading: isLoadingAsset } = useQueryApi('asset', 'asset', 'GET');
	const { data: currInvoice, isLoading: isLoadingCurrInvoice } = useQueryApi('current-invoice', 'current-invoice', 'GET');
	const { data: profitLoss, isLoading: isLoadingProfitLoss } = useQueryApi('profit-loss', 'profit-loss', 'GET');
	const [show, setShow] = useState(false);
	return (
		<div className="mt-1">
			<Card className="bg-primary text-primary-foreground shadow-md rounded-lg">
				<CardContent>
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-1">
							<CardTitle className="text-sm font-medium">Balance Available</CardTitle>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setShow(!show)}
							>
								{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
							</Button>
						</div>
					</div>
					<div className="">
						<div className="flex items-baseline">
							<span className="text-xl font-medium">Rp</span>
							{isLoadingAsset && <Skeleton className="ml-1 h-5 w-40 rounded-md" />}
							{!isLoadingAsset && <span className="text-3xl font-bold ml-1">{`${show ? formatCurrency(asset ?? 0) : "••••••"}`}</span>}
						</div>
					</div>
					<div className="my-4 border-t border-white/20"></div>
					<div className="flex justify-between text-sm">
						<div>
							<div className="flex items-center space-x-1">
								<span className="block text-primary-foreground/80">Invoices</span>
								<Info className="h-4 w-4" />
							</div>
							<div className="font-medium">
								{isLoadingCurrInvoice && <Skeleton className="h-4 w-20" />}
								{!isLoadingCurrInvoice && <span>{`Rp. ${show ? formatCurrency(currInvoice ?? 0) : "••••••"}`}</span>}
							</div>
						</div>
						<div className="text-right">
							<div className="flex items-center justify-end space-x-1">
								<span className="block text-primary-foreground/80">P/L</span>
								<Info className="h-4 w-4" />
							</div>
							<div className="font-medium">
								{isLoadingProfitLoss && <Skeleton className="h-4 w-20" />}
								{!isLoadingProfitLoss && (
									profitLoss > 0 ? (
										<span className="text-green-600">{`+${show ? formatCurrency(profitLoss ?? 0) : "••,••"}%`}</span>
									) : (
										<span className="text-red-600">{`${show ? formatCurrency(profitLoss ?? 0) : "••,••"}%`}</span>
									)
								)
								}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
