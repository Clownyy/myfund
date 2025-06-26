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
import { invoiceSchema, sysMenuSchema } from "@/schema/schema"
import { useDialogStore } from "@/stores/dialog-store"
import { useEffect } from "react"
import { Switch } from "../ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function DialogInvoice() {
    const { isOpen, data, closeDialog, onSubmit } = useDialogStore();

    const form = useForm({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            id: data.id ?? 0,
            billName: data.billName ?? "",
            billAmount: data.billAmount ?? "0",
            type: data.type ?? "",
            frequency: data.frequency ?? 0,
            active: data.active ?? false
        }
    })
    useEffect(() => {
        form.reset({
            id: data.id ?? 0,
            billName: data.billName ?? "",
            billAmount: data.billAmount ?? "0",
            type: data.type ?? "",
            frequency: data.frequency ?? 0,
            active: data.active ?? false,
        });
    }, [data, form]);
    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Manage Invoice Template</DialogTitle>
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
                            name="billName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Invoice Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Invoice Name"
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
                            name="billAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Amount"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ONCE">Once</SelectItem>
                                            <SelectItem value="WEEKLY">Weekly</SelectItem>
                                            <SelectItem value="MONTHLY">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="frequency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Frequency</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Frequency"
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="active"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Active</FormLabel>
                                            <FormControl className="mt-2">
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
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
