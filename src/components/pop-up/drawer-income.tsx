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
import { transactionSchema } from "@/schema/schema";
import { useDialogStore } from "@/stores/dialog-store";
import { useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useQueryApi } from "@/hooks/use-query";
import { formatCurrency } from "@/lib/utils";
import { InstrumentData } from "@/types/interface";

export function DrawerIncome() {
    const { isOpen, data, closeDialog, onSubmit } = useDialogStore();

    const form = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            id: data.id ?? 0,
            notes: data.notes ?? "",
            amount: 1,
            type: data,
            price: data.price ?? 0,
            category: data.category ?? "",
            instrumentId: data.instrumentId ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            id: data.id ?? 0,
            notes: data.notes ?? "",
            amount: 1,
            type: data,
            price: data.price ?? 0,
            category: data.category ?? "",
            instrumentId: data.instrumentId ?? "",
        });
    }, [data, form]);

    const { data: instrumentData = [] } = useQueryApi(
        "instruments",
        "instruments",
        "GET",
    );

    return (
        <Drawer open={isOpen} onOpenChange={closeDialog} modal={false}>
            <DrawerContent className="p-6">
                <DrawerHeader>
                    <DrawerTitle>Manage {data.toLowerCase()}</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your data here. Click save when you're
                        done.
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
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Quantity"
                                            type="number"
                                            readOnly={
                                                data === "SAVING" ||
                                                data === "SAVINGOUT"
                                                    ? false
                                                    : true
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {(data === "SAVING" || data === "SAVINGOUT") && (
                            <FormField
                                control={form.control}
                                name="instrumentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instrument *</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                const selected =
                                                    instrumentData.find(
                                                        (opt: InstrumentData) =>
                                                            opt.id.toString() ===
                                                            value,
                                                    );
                                                if (selected) {
                                                    form.setValue(
                                                        "price",
                                                        selected.buyPrice,
                                                    );
                                                }
                                            }}
                                            defaultValue={field.value.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select instrument" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {instrumentData.map(
                                                    (opt: InstrumentData) => (
                                                        <SelectItem
                                                            key={opt.id}
                                                            value={opt.id.toString()}
                                                        >
                                                            {opt.instrumentName}{" "}
                                                            -{" "}
                                                            {formatCurrency(
                                                                opt.buyPrice,
                                                            )}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Price"
                                            type="number"
                                            readOnly={
                                                data === "SAVING" ||
                                                data === "SAVINGOUT"
                                                    ? true
                                                    : false
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Category"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Notes"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DrawerFooter className="flex justify-end">
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
