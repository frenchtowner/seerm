// StarshipView.tsx
import React from "react";
import { Contact } from "../ThemeContext";

const StarshipView = ({ data }: { data: Contact[] }) => (
  <div className="bg-indigo-950 text-indigo-100 p-6 rounded-xl space-y-4">
    <h2 className="text-2xl font-bold mb-2">🚀 Starship Console</h2>
    {data.map((c) => (
      <div key={c.id} className="bg-indigo-800 p-3 rounded shadow">
        <div className="font-semibold text-lg">{c.name}</div>
        <div className="text-sm">Tags: {c.tags?.join(", ")}</div>
        <div className="text-sm">Urgency: {c.urgency}</div>
      </div>
    ))}
  </div>
);

export default StarshipView;