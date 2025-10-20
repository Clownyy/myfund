"use client";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { savingSchema } from "@/schema/schema";
import { useDialogStore } from "@/stores/dialog-store";
import { useEffect, useState } from "react";
import { useQueryApi } from "@/hooks/use-query";
import { cn, formatCurrency } from "@/lib/utils";
import { ComboBox } from "../combobox";
import { InstrumentData } from "@/types/interface";

export function DrawerSaving() {
    const { isOpen, data, closeDialog, onSubmit } = useDialogStore();
    const [openPopover, setOpenPopover] = useState(false);

    const form = useForm({
        resolver: zodResolver(savingSchema),
        defaultValues: {
            id: data.id ?? 0,
            savingName: data.savingName ?? "",
            amount: data.amount ?? 0,
            instrumentId: data.instrumentId ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            id: data.id ?? 0,
            savingName: data.savingName ?? "",
            amount: data.amount ?? 0,
            instrumentId: data.instrumentId ?? "",
        });
    }, [data, form]);

    const { data: instrumentData = [] } = useQueryApi(
        "instruments",
        "instruments",
        "GET"
    );

    return (
        <Drawer open={isOpen} onOpenChange={closeDialog}>
            <DrawerContent className="p-6 sm:max-w-md sm:mx-auto">
                <DrawerHeader>
                    <DrawerTitle>Manage Saving</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your data here. Click save when you&apos;re done.
                    </DrawerDescription>
                </DrawerHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) => {
                            const { id, ...rest } = values;
                            const payload = id ? values : rest;
                            if (onSubmit) onSubmit(payload);
                        })}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="savingName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Saving Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Saving Name" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Quantity" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instrumentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instrument *</FormLabel>
                                    <ComboBox
                                        items={instrumentData}
                                        value={field.value}
                                        onChange={(val) => field.onChange(Number(val))}
                                        getLabel={(opt: InstrumentData) =>
                                            `${opt.instrumentCode} | ${opt.instrumentName} - ${formatCurrency(
                                                opt.sellPrice
                                            )}`
                                        }
                                        getValue={(opt) => opt.id}
                                        placeholder="Select instrument"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DrawerFooter className="flex justify-end space-x-2 pt-4">
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            <Button type="submit" variant="default">
                                Save changes
                            </Button>
                        </DrawerFooter>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    );
}
