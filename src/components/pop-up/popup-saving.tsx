import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { savingSchema } from "@/schema/schema"
import { useDialogStore } from "@/stores/dialog-store"
import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useQueryApi } from "@/hooks/use-query"
import { formatCurrency } from "@/lib/utils"

export function DialogSaving() {
    const { isOpen, data, closeDialog, onSubmit } = useDialogStore();

    const form = useForm({
        resolver: zodResolver(savingSchema),
        defaultValues: {
            id: data.id ?? 0,
            savingName: data.savingName ?? "",
            amount: data.amount ?? 0,
            instrumentId: data.instrumentId ?? ""
        }
    })

    useEffect(() => {
        form.reset({
            id: data.id ?? 0,
            savingName: data.savingName ?? "",
            amount: data.amount ?? 0,
            instrumentId: data.instrumentId ?? ""
        });
    }, [data, form]);

    const { data: instrumentData = [] } = useQueryApi('instruments', 'instruments', 'GET');
    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Manage Saving</DialogTitle>
                    <DialogDescription>
                        Make changes to your data here. Click save when you&apos;re done.
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
                            name="savingName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Saving Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Saving Name"
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
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Quantity"
                                            type="number"
                                            {...field}
                                            // onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select instrument" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {instrumentData.map((opt: any) => (
                                                <SelectItem key={opt.id} value={opt.id.toString()}>
                                                    {opt.instrumentCode} | {opt.instrumentName} - {formatCurrency(opt.sellPrice)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
