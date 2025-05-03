// RingGatesView.tsx
import React from "react";
import { Contact } from "../ThemeContext";

const RingGatesView = ({ data }: { data: Contact[] }) => (
  <div className="bg-gradient-to-br from-gray-950 to-gray-900 text-indigo-300 p-6 rounded-xl">
    <h2 className="text-2xl font-bold text-indigo-400 mb-1">🌀 Ring Gates</h2>
    <p className="text-sm text-indigo-600 italic mb-4">
      Urgency bends time and space.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map((c) => (
        <div key={c.id} className="bg-gray-800 p-4 rounded-xl shadow-lg border border-indigo-700">
          <div className="text-lg font-semibold">{c.name}</div>
          <div className="text-sm">Status: {c.status} | Urgency: {c.urgency}</div>
        </div>
      ))}
    </div>
  </div>
);

export default RingGatesView;