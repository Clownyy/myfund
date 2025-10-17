import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { useQueryApi } from "@/hooks/use-query";
import { Skeleton } from "./ui/skeleton";
import { formatCurrency } from "@/lib/utils";

export function SectionCards() {
	const { data, isLoading, error } = useQueryApi('cash-pos', 'cash-pos', 'GET');
	const { data: asset, isLoading: isLoadingAsset } = useQueryApi('asset', 'asset', 'GET');
	const { data: currInvoice, isLoading: isLoadingCurrInvoice } = useQueryApi('current-invoice', 'current-invoice', 'GET');
	const { data: nextInvoice, isLoading: isLoadingNextInvoice } = useQueryApi('next-invoice', 'next-invoice', 'GET');
	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Asset</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{isLoadingAsset && <Skeleton/>}
						{!isLoadingAsset && <span>{`Rp. ${formatCurrency(asset)}`}</span>}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingUp />
							+12.5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Trending up this month <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Visitors for the last 6 months
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Cash Balance</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
					{isLoading && <Skeleton/>}
						{!isLoading && <span>{`Rp. ${formatCurrency(data.amount)}`}</span>}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingDown />
							-20%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Down 20% this period <IconTrendingDown className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Acquisition needs attention
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Current Invoice</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{isLoadingCurrInvoice && <Skeleton/>}
						{!isLoadingCurrInvoice && <span>{`Rp. ${formatCurrency(currInvoice)}`}</span>}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingUp />
							+12.5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Strong user retention <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">Engagement exceed targets</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Next Invoice</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{isLoadingNextInvoice && <Skeleton/>}
						{!isLoadingNextInvoice && <span>{`Rp. ${formatCurrency(nextInvoice)}`}</span>}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingUp />
							+4.5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Steady performance increase <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">Meets growth projections</div>
				</CardFooter>
			</Card>
		</div>
	)
}
