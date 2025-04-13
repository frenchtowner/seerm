// EVAView.tsx
import React from "react";
import { Contact } from "../ThemeContext";

const EVAView = ({ data }: { data: Contact[] }) => (
  <div className="bg-black text-white p-6 rounded-xl space-y-4">
    <h2 className="text-2xl font-light tracking-wide mb-2">🛰 EVA Drift</h2>
    {data.map((c) => (
      <div key={c.id} className="bg-gray-900 border border-gray-700 p-3 rounded-md">
        <div className="font-semibold">{c.name}</div>
        <div className="text-xs text-gray-400">{c.status} | {c.urgency}</div>
      </div>
    ))}
  </div>
);

export default EVAView;