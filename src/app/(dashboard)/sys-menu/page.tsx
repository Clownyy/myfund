"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { AddOn, Toolbar } from "@/types/interface";
import { useQueryApi } from "@/hooks/use-query";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDialogStore } from "@/stores/dialog-store";
import { DialogSysMenu } from "@/components/pop-up/create-sys-menu";
import { confirmAlert } from "@/lib/confirm-alert";
import { MenuInfo } from "next-auth";

const columns: ColumnDef<MenuInfo>[] = [
    {
        header: 'Menu Code',
        accessorKey: 'menuCode',
        size: 30
    },
    {
        header: 'Title',
        accessorKey: 'title',
    },
    {
        header: 'URL',
        accessorKey: 'url',
    },
    {
        header: 'Icon',
        accessorKey: 'icon',
    },
    {
        header: 'Admin',
        accessorKey: 'isAdmin',
        size: 100
    }
]


export default function SysMenu() {
    const addOns: AddOn[] = [
        {
            name: 'Edit',
            icon: 'Pencil',
            onClick: (row) => openPopup((row as { original: MenuInfo }).original),
        },
        {
            name: 'Delete',
            icon: 'Trash',
            onClick: (row) => deleteData((row as { original: MenuInfo }).original),
        },
    ]

    const toolbar: Toolbar[] = [
        {
            name: 'Create',
            icon: 'Plus',
            onClick: () => openPopup(),
        }
    ]
    function openPopup(data?: unknown) {
        if (data) {
            openDialog(data, updateData);
        } else {
            openDialog({}, createData);
        }
    }

    async function createData(dataSubmit: unknown) {
        mutate(dataSubmit, {
            onSuccess: () => {
                closeDialog();
            }
        })
    }
    async function updateData(data: unknown) {
        if (typeof data === 'object' && data !== null) {
            const menuData = data as MenuInfo
            data = { ...data, id: menuData.menuCode };
            updateMutate(data, {
                onSuccess: () => {
                    closeDialog();
                }
            })
        }
    }

    async function deleteData(data: MenuInfo) {
        confirmAlert({
            message: "This action cannot be undone. This will permanently delete your data from our servers",
            onConfirm: () => {
                deleteMutate(data.menuCode, {
                    onSuccess: () => {
                        closeDialog();
                    }
                })
            }
        })
    }

    const { isOpen, openDialog, closeDialog } = useDialogStore();
    const { data, isLoading } = useQueryApi('sys-menus', 'sys-menus', 'GET');
    const { mutate } = useQueryApi('sys-menus', 'sys-menus', 'POST');
    const { mutate: updateMutate } = useQueryApi('sys-menus', 'sys-menus', 'PATCH');
    const { mutate: deleteMutate } = useQueryApi('sys-menus', 'sys-menus', 'DELETE');

    if (isLoading) { return <DataTableSkeleton columns={columns} row={5} /> };
    return (
        <>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>System Menu</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            System Menu Data
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        toolbar={toolbar}
                        columns={columns}
                        data={data}
                        addOns={addOns}
                        allowSelection
                    />
                </CardContent>
            </Card>
            {isOpen && <DialogSysMenu />}
        </>
    )
}