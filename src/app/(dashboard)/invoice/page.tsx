"use client";
import YourBill from "./your-bill";
import Bill from "./bill";

export default function BillPages() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Bill />
            </div>
            <div>
                <YourBill />
            </div>
        </div>
    )
}