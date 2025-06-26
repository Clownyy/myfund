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
import { instrumentSchema } from "@/schema/schema"
import { useDialogStore } from "@/stores/dialog-store"
import { useEffect } from "react"
import { Switch } from "../ui/switch"

export function DialogInstrument() {
    const { isOpen, data, closeDialog, onSubmit } = useDialogStore();

    const form = useForm({
        resolver: zodResolver(instrumentSchema),
        defaultValues: {
            id: data.id ?? 0,
            instrumentCode: data.instrumentCode ?? "",
            instrumentName: data.instrumentName ?? "",
            buyPrice: data.buyPrice ?? "",
            sellPrice: data.sellPrice ?? ""
        }
    })
    useEffect(() => {
        form.reset({
            id: data.id ?? 0,
            instrumentCode: data.instrumentCode ?? "",
            instrumentName: data.instrumentName ?? "",
            buyPrice: data.buyPrice ?? "",
            sellPrice: data.sellPrice ?? ""
        });
    }, [data, form]);
    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Manage Instrument</DialogTitle>
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
                            name="instrumentCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instrument Code *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Instrument Code"
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
                            name="instrumentName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instrument Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Instrument Name"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="buyPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Buy Price *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Buy Price"
                                                    type="number"
                                                    {...field}
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
                                    name="sellPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sell Price *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Sell Price"
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
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
