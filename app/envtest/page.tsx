"use client";

export default function EnvTest() {
    return (
        <div className="p-10 text-white bg-black">
            <h1 className="text-2xl">Environment Test</h1>
            <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
            <p>Anon Key Length: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length}</p>
        </div>
    );
}
