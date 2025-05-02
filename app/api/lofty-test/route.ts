import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = 'your-real-lofty-key-here';

  try {
    const res = await fetch("https://api.lofty.com/v1/contacts", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Lofty returned ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Hardcoded fetch failed" }, { status: 500 });
  }
}
