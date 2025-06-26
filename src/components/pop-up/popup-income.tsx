import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionSchema } from "@/schema/schema"
import { useDialogStore } from "@/stores/dialog-store"
import { useEffect, useState } from "react"
import { Switch } from "../ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useQueryApi } from "@/hooks/use-query"
import { formatCurrency } from "@/lib/utils"

export function DialogIncome() {
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
            savingId: data.savingId ?? ""
        }
    })

    useEffect(() => {
        form.reset({
            id: data.id ?? 0,
            notes: data.notes ?? "",
            amount: 1,
            type: data,
            price: data.price ?? 0,
            category: data.category ?? "",
            savingId: data.savingId ?? ""
        });
    }, [data, form]);

    const { data: savingData = [], isLoading } = useQueryApi('savings', 'savings', 'GET');
    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Manage Income</DialogTitle>
                    <DialogDescription>
                        Make changes to your data here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => {
                        const { id, ...rest } = values;
                        const payload = id ? values : rest;
                        if (onSubmit) onSubmit(payload);
                    })} className="space-y-4">
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
                                            readOnly={data == 'SAVING' ? false : true}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {data == 'SAVING' &&
                            <FormField
                                control={form.control}
                                name="savingId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Saving *</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                const selected = savingData.find((opt: any) => opt.id.toString() === value);
                                                if (selected) {
                                                    form.setValue('price', selected.instrument.sellPrice);
                                                }
                                            }}
                                            defaultValue={field.value.toString()}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select savings" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {savingData.map((opt: any) => (
                                                    <SelectItem key={opt.id} value={opt.id.toString()}>
                                                        {opt.savingName} - {formatCurrency(opt.instrument.sellPrice)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }
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
                                            readOnly={data == 'SAVING' ? true : false}
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
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" variant="default">
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
