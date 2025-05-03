// ZombieGardenView.tsx
"use client";

import React from "react";

const zombieClients = [
  { id: "1", name: "Carl Spogneworth", hungerLevel: 10, lastBrain: "3 days ago" },
  { id: "2", name: "Brenda Groanstein", hungerLevel: 7, lastBrain: "Yesterday" },
  { id: "3", name: "Doug the Decayed", hungerLevel: 5, lastBrain: "1 hour ago" },
];

export default function ZombieGardenView() {
  return (
    <div className="bg-gray-900 min-h-screen text-green-100 p-10">
      <h1 className="text-4xl font-zombie mb-6 text-red-600">🧟 Zombie Clients</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {zombieClients.map((zombie) => (
          <div
            key={zombie.id}
            className="bg-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-red-800 hover:scale-[1.03] transition-all duration-300"
          >
            <img
              src="/images/Carl-in-red.png" // replace with Carl’s undead avatar
              alt={zombie.name}
              className="rounded-full w-32 h-32 mx-auto mb-4 grayscale hover:saturate-150 hover:animate-pulse"
            />
            <h2 className="text-xl text-red-300 font-bold text-center">{zombie.name}</h2>
            <p className="text-sm text-center mt-2 text-gray-400">
              🧠 Last brain: <span className="text-yellow-300">{zombie.lastBrain}</span>
            </p>
            <p className="text-sm text-center mt-1 text-red-400">
              Hunger Level: <span className="font-bold">{zombie.hungerLevel}/10</span>
            </p>
            <div className="text-center mt-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 hover:animate-wiggle">
                Feed Carl
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
