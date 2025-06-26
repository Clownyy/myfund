import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { username, otpCode, ipAddress } = body;

    try {
        const reqBody = JSON.stringify({
            username,
            otpCode,
            ipAddress
        })
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}otp/validate-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: reqBody,
        });

        const data = await res.json();
        if (!data) {
            return NextResponse.json({ error: data.message || "OTP validation failed" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
