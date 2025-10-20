"use client";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from "react"
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    row: number
}

export function DataTableSkeleton<TData, TValue>({
    columns,
    row = 5
}: DataTableProps<TData, TValue>) {
    const rowCount = Array(row).fill(0);
    const table = useReactTable({
        data: [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Data</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Some Data
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative max-h-[60vh] overflow-auto whitespace-nowrap rounded-md border">
                        <Table className="text-sm">
                            <TableHeader className="bg-secondary hover:bg-secondary">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {rowCount.map((_, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {columns.map((_, index) => (
                                            <TableCell key={index}>
                                                <Skeleton className="h-4 w-24 rounded-md" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
