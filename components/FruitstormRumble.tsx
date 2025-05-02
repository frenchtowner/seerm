// FruitstormRumble.tsx — Controlled Chaos CRM
"use client";

import React, { useState } from "react";
import { Contact } from "@/types";

const contacts: Contact[] = [
  { id: "1", user_id: "u1", name: "Carl", status: "critical", urgency: 10, created_at: "" },
  { id: "2", user_id: "u2", name: "Bev", status: "healthy", urgency: 6, created_at: "" },
  { id: "3", user_id: "u3", name: "Suzy", status: "neglected", urgency: 2, created_at: "" },
  { id: "4", user_id: "u4", name: "Tim", status: "neglected", urgency: 3, created_at: "" },
  { id: "5", user_id: "u5", name: "Ghost Pete", status: "critical", urgency: 1, created_at: "" },
];

function urgencyColor(urgency: number): string {
  const colors = ["#e0e0e0", "#9ec5fe", "#6fffe9", "#ffe066", "#ff6f61", "#d72638"];
  if (urgency >= 9) return colors[5];
  if (urgency >= 7) return colors[4];
  if (urgency >= 5) return colors[3];
  if (urgency >= 3) return colors[2];
  if (urgency >= 1) return colors[1];
  return colors[0];
}

export default function FruitstormRumble() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      {contacts.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{
            top: `${Math.random() * 85 + 5}vh`,
            left: `${Math.random() * 85 + 5}vw`,
            width: `${c.urgency * 45}px`,
            height: `${c.urgency * 45}px`,
          }}
          onMouseEnter={() => setHoveredId(c.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className={`rounded-md flex items-center justify-center text-xs font-bold text-white shadow-md transition-transform duration-300 ${hoveredId === c.id ? "scale-125 z-20" : "z-10"}`}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: urgencyColor(c.urgency),
              animation: `wobble-${c.id} ${10 - Math.min(c.urgency, 9)}s ease-in-out infinite alternate`,
            }}
          >
            {c.name}
            {hoveredId === c.id && (
              <div className="absolute top-full mt-2 p-3 bg-white text-black rounded shadow-lg w-40">
                <div className="font-bold text-center">{c.name}</div>
                <div className="text-xs text-center">Urgency: {c.urgency}</div>
                <div className="text-xs text-center">Status: {c.status}</div>
              </div>
            )}
          </div>
          <style>{`
            @keyframes wobble-${c.id} {
              0% { transform: translate(0px, 0px) rotate(0deg); }
              50% { transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) rotate(${Math.random() * 10 - 5}deg); }
              100% { transform: translate(0px, 0px) rotate(0deg); }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}
