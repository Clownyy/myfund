"use client";
import YourBill from "./your-bill";
import Bill from "./bill";

export default function BillPages() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
                <Bill />
            </div>
            <div>
                <YourBill />
            </div>
        </div>
    )
}