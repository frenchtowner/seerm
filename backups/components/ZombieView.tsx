// ZombieView.tsx
import React from "react";
import { Contact } from "../ThemeContext";

const ZombieView = ({ data }: { data: Contact[] }) => (
  <div className="bg-red-950 text-green-200 p-6 rounded-xl space-y-4">
    <h2 className="text-2xl font-bold mb-2">🧟 Zombie Mode</h2>
    {data.map((c) => (
      <div key={c.id} className="border p-3 rounded border-red-800 bg-red-900">
        <div className="font-semibold text-lg">{c.name}</div>
        <div className="text-sm">Urgency: {c.urgency}</div>
        <div className="text-sm">Status: {c.status}</div>
      </div>
    ))}
  </div>
);

export default ZombieView;