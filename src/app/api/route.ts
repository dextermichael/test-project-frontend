import { NextResponse } from "next/server";
export const revalidate = 60;

export async function GET() {
    const res = await fetch("https://dog.ceo/api/breeds/image/random", {
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();

    return NextResponse.json({ data });
}
