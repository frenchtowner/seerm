// app/seerm-view/page.tsx
Fix: Move Supabase client to client - side for Netlify build
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function SeermViewPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase.from("contacts").select("*");

        if (error) throw error;
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  if (error) {
    return (
      <main className="min-h-screen bg-white p-6">
        <h1 className="text-xl font-bold text-red-600">Failed to load contacts</h1>
        <pre>{error}</pre>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
