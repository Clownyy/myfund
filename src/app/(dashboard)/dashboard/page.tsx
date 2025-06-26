import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table/data-table"

const columns: ColumnDef<unknown>[] = [
	{
		header: 'ID',
		accessorKey: 'id',
	}, 
	{
		header: 'Header',
		accessorKey: 'header',
	},
	{
		header: 'Type',
		accessorKey: 'type',
	},
	{
		header: 'Status',
		accessorKey: 'status',
	},
	{
		header: 'Target',
		accessorKey: 'target',
	},
	{
		header: 'Limit',
		accessorKey: 'limit',
	},
	{
		header: 'Reviewer',
		accessorKey: 'reviewer',
	},
]
export default function Page() {
	return (
		<>
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<SectionCards />
						<div className="px-4 lg:px-6">
							<ChartAreaInteractive />
						</div>
						<DataTable
							columns={columns}
							data={data}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
