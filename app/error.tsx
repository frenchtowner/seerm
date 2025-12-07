"use client";

export default function Error({ error }: { error: Error }) {
    return (
        <div className="p-10 text-white bg-red-900 min-h-screen">
            <h1 className="text-2xl font-bold">🔥 Something broke</h1>
            <p className="mt-4">{error.message}</p>
        </div>
    );
}
