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
import { Button } from "@/components/ui/button"
import React from "react"
import { DataTablePagination } from "./pagination-table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { PlusIcon } from "lucide-react"
import { DataTableColumnHeader } from "./header-table"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { AddOn, Toolbar } from "@/types/interface"
import ContextMenuWrapper from "./context-menu";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    // onEdit?: (item: any) => void;
    // onDelete?: (item: any) => void;
    // onCreate?: any
    allowSelection?: boolean;
    onSelectedRows?: any;
    // allowAdding?: boolean;
    // allowEdit?: boolean;
    // allowDelete?: boolean;
    addOns?: AddOn[];
    toolbar?: Toolbar[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
    // onEdit,
    // onDelete,
    // onCreate,
    allowSelection = false,
    onSelectedRows,
    // allowAdding = false,
    // allowEdit,
    // allowDelete,
    addOns,
    toolbar
}: DataTableProps<TData, TValue>) {
    const tableColumns = React.useMemo(() => {
        if (!allowSelection) return columns
        return [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                size: 10,
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            ...columns,
        ]
    }, [allowSelection, columns])

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection
        }
    })
    const normalizedToolbar = toolbar?.map((item) => ({
        ...item,
        align: item.align ?? "right",
    }));
    const toolbarLeft = normalizedToolbar?.filter((item) => item.align === "left")
    const toolbarRight = normalizedToolbar?.filter((item) => item.align === "right")

    React.useEffect(() => {
        const selectedRows = Object.keys(rowSelection).map((key: any) => data[key]);
        onSelectedRows?.(selectedRows);
    }, [rowSelection, data, onSelectedRows]);

    return (
        <div>
            <div className="flex items-center justify-between py-2">
                <div className="flex">
                    {toolbarLeft?.length ? toolbarLeft.map(({ name, icon, onClick }, index) => {
                        const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon ?? LucideIcons.Circle;
                        return (
                            <Button
                                key={index}
                                size="sm"
                                variant={"ghost"}
                                className="ml-auto hidden h-8 flex"
                                onClick={onClick}
                            >
                                <Icon size={20} className="" />
                                {name}
                            </Button>
                        )
                    }) : ""}
                </div>
                <div className="flex">
                    {toolbarRight?.length ? toolbarRight.map(({ name, icon, onClick }, index) => {
                        const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon ?? LucideIcons.Circle;
                        return (
                            <Button
                                key={index}
                                size="sm"
                                variant={"ghost"}
                                className="ml-auto hidden h-8 flex"
                                onClick={onClick}
                            >
                                <Icon size={20} className="" />
                                {name}
                            </Button>
                        )
                    }) : ""}
                    {/* {allowAdding && (
                        <Button
                            size="sm"
                            variant={"ghost"}
                            className="ml-auto hidden h-8 flex"
                            onClick={onCreate}
                        >
                            <PlusIcon size={20} />
                        </Button>
                    )} */}
                </div>
            </div>
            <div className="relative max-h-[60vh] overflow-auto whitespace-nowrap rounded-md border">
                <ScrollArea>
                    <Table className="text-sm">
                        <TableHeader className="bg-secondary hover:bg-secondary">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="whitespace-nowrap" style={{width: `${header.getSize()}px`}}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : header.id != "select" ? flexRender(
                                                        <DataTableColumnHeader column={header.column} title={header.column.columnDef.header as string} />,
                                                        header.getContext()
                                                    ) : flexRender(
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
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <ContextMenuWrapper
                                        key={row.id}
                                        // onEdit={onEdit ? () => onEdit(row) : undefined}
                                        // onDelete={onDelete ? () => onDelete(row) : undefined}
                                        // allowEdit={allowEdit}
                                        // allowDelete={allowDelete}
                                        addOns={addOns}
                                        rowData={row}>
                                        <TableRow className="h-12"
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                    {typeof cell.getValue() === 'boolean' ?
                                                        flexRender(<Checkbox checked={Boolean(cell.getValue())} />, cell.getContext())
                                                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </ContextMenuWrapper>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className="items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}
