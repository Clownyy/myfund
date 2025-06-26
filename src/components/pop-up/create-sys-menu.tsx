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
import { sysMenuSchema } from "@/schema/schema"
import { useDialogStore } from "@/stores/dialog-store"
import { useEffect } from "react"
import { Switch } from "../ui/switch"
import { IconSelector } from "../icon-selector"

export function DialogSysMenu() {
    const { isOpen, data, closeDialog, onSubmit } = useDialogStore();

    const form = useForm({
        resolver: zodResolver(sysMenuSchema),
        defaultValues: {
            id: data.id ?? 0,
            menuCode: data.menuCode ?? "",
            title: data.title ?? "",
            url: data.url ?? "",
            icon: data.icon ?? "",
            isAdmin: data.isAdmin ?? false
        }
    })
    useEffect(() => {
        form.reset({
            id: data.id ?? 0,
            menuCode: data.menuCode ?? "",
            title: data.title ?? "",
            url: data.url ?? "",
            icon: data.icon ?? "",
            isAdmin: data.isAdmin ?? false,
        });
    }, [data, form]);
    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Manage System Menu</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => {
                        const { id, ...rest } = values;
                        const payload = id ? values : rest;
                        if (onSubmit) onSubmit(payload);
                        // closeDialog();
                    })} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="menuCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Menu Code *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Menu Code"
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
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Title"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>URL *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="URL"
                                                    type="text"
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
                                    name="isAdmin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Admin</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Choose Icon</FormLabel>
                                    <FormControl>
                                        <IconSelector value={field.value} onChange={field.onChange} />
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
