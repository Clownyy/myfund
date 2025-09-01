import { z } from "zod";

export const sysMenuSchema = z.object({
    id: z.number(),
    menuCode: z.string().min(1, "Menu Code is required"),
    title: z.string().min(1, "Title is required"),
    url: z.string().min(1, "URL is required"),
    icon: z.string().min(1, "Icon is required"),
    isAdmin: z.boolean(),
})

export const invoiceSchema = z.object({
    id: z.number(),
    billName: z.string().min(1, "Bill Name is required"),
    billAmount: z.string().transform((val) => parseFloat(val)).pipe(z.number().min(1, "Amount is required")),
    type: z.string().min(1, "Type is required"),
    frequency: z.number(),
    active: z.boolean(),
})

export const instrumentSchema = z.object({
    id: z.number(),
    instrumentCode: z.string().min(1, "Instrument Code is required"),
    instrumentName: z.string().min(1, "Instrument Name is required"),
    buyPrice: z.string().transform((val) => parseFloat(val)).pipe(z.number().min(1, "Amount is required")),
    sellPrice: z.string().transform((val) => parseFloat(val)).pipe(z.number().min(1, "Amount is required")),
})

export const savingSchema = z.object({
    id: z.number(),
    savingName: z.string().min(1, "Saving Name is required"),
    amount: z.coerce.number(),
    instrumentId: z.coerce.number({
        required_error: "Please select an instrument for this saving"
    })
})

export const transactionSchema = z.object({
    id: z.number(),
    notes: z.string().min(1, "Description is required"),
    amount: z.coerce.number(),
    type: z.string().min(1, "Type is required"),
    price: z.coerce.number().min(1, "Price is required"),
    category: z.string().min(1, "Category is required"),
    savingId: z.coerce.number()
})