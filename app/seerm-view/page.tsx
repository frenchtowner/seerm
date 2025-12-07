// app/seerm-view/page.tsx
import supabase from "@/lib/supabaseServer";

export default async function SeermViewPage() {
  const { data, error } = await supabase.from("contacts").select("*");

  if (error) {
    return (
      <main className="min-h-screen bg-white p-6">
        <h1 className="text-xl font-bold text-red-600">Failed to load contacts</h1>
        <pre>{error.message}</pre>
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
