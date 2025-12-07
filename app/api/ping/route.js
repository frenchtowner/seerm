// /app/api/ping/route.js
export async function GET() {
    const SUPABASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/contacts`;
    const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    try {
        const response = await fetch(SUPABASE_URL, {
            headers: {
                apikey: API_KEY,
                Authorization: `Bearer ${API_KEY}`,
            },
        });

        if (response.ok) {
            return new Response("✅ Supabase is awake.", { status: 200 });
        } else {
            return new Response(`⚠️ Ping failed. Status: ${response.status}`, {
                status: response.status,
            });
        }
    } catch (err) {
        return new Response(`❌ Error: ${err.message}`, { status: 500 });
    }
}
