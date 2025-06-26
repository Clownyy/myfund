import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true });
    response.cookies.set("id_token", "", { expires: new Date(0), path: "/" }); // Remove token
    return response;
}
