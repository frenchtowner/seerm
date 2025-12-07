import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function SupaLiveTest() {
    const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .limit(5);

    return (
        <div className="p-10 text-white bg-black">
            <h1 className="text-2xl font-bold">📡 Supabase Live Query</h1>
            {error ? (
                <p className="text-red-500">{error.message}</p>
            ) : (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}
