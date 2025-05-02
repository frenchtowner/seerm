// TreeView.tsx (Fruit-Driven CRM — Enhanced Visual Urgency)
"use client";

import React from "react";
import { Contact } from "@/types";

function getFruitStyle(urgency: number, tags?: string[]): string {
  const brightness = 100 + urgency * 5; // 105–150
  const saturation = 80 + urgency * 7; // 87–150
  const bounce = urgency >= 8 ? "animate-bounce" : urgency >= 4 ? "animate-pulse" : "";
  const faded = urgency < 3 ? "opacity-30" : "";
  const grayscale = tags?.includes("ghosted-client") && urgency < 5 ? "grayscale" : "";
  return `${bounce} drop-shadow-md brightness-[${brightness}%] saturate-[${saturation}%] ${faded} ${grayscale}`;
}

function getFruitSize(urgency: number): string {
  if (urgency >= 10) return "w-48 h-48";
  if (urgency >= 8) return "w-44 h-44";
  if (urgency >= 6) return "w-40 h-40";
  if (urgency >= 4) return "w-36 h-36";
  if (urgency >= 2) return "w-32 h-32";
  return "w-28 h-28";
}

function getFruitImageSrc(): string {
  return "/images/Apple-no-bg.png";
}

function getEngagementLevel(score: number): string {
  if (score >= 90) return "🔥 Highly Engaged";
  if (score >= 70) return "😊 Engaged";
  if (score >= 40) return "😐 Lukewarm";
  if (score >= 20) return "🥶 Cold";
  return "🧊 Ice-Cold";
}

const sampleData: Contact[] = [
  {
    id: "1",
    user_id: "u1",
    name: "Carl",
    email: "carl@example.com",
    phone: "555-0001",
    mailing_address: "1 Graveyard Ln",
    status: "critical",
    urgency: 2,
    tags: ["ghosted-client"],
    last_contact_date: "2023-12-01",
    contact_frequency_days: 30,
    notes: "Ghosted me hard.",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "u1",
    name: "Bev",
    email: "bev@example.com",
    phone: "555-0002",
    mailing_address: "2 Blossom St",
    status: "healthy",
    urgency: 10,
    tags: ["beloved"],
    last_contact_date: "2024-04-01",
    contact_frequency_days: 7,
    notes: "Loyal and kind.",
    created_at: new Date().toISOString(),
  },
];

function TreeView({ data }: { data?: Contact[] }) {
  const displayData = data && data.length > 0 ? data : sampleData;

  return (
    <div className="p-10 min-h-screen bg-green-50 grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
      {displayData.map((contact) => {
        const style = getFruitStyle(contact.urgency, contact.tags);
        const size = getFruitSize(contact.urgency);
        const engagementScore = Math.max(0, 100 - (contact.urgency * 10 + (contact.tags?.includes("ghosted-client") ? 20 : 0)));

        return (
          <div
            key={contact.id}
            className="relative group flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={getFruitImageSrc()}
              alt={contact.name}
              className={`transition-transform duration-500 cursor-pointer ${style} ${size}`}
            />
            <div className="mt-2 text-center text-sm text-gray-700 font-semibold">
              {contact.name}
            </div>
            <div className="text-xs text-gray-500 italic">
              {getEngagementLevel(engagementScore)}
            </div>
            <div className="opacity-0 group-hover:opacity-100 absolute -top-40 left-1/2 -translate-x-1/2 w-max text-base text-gray-700 bg-white px-6 py-4 rounded shadow-lg transition-opacity z-10">
              <p className="font-semibold text-lg">{contact.name}</p>
              <p className="text-gray-500 text-sm">Urgency: {contact.urgency}</p>
              <p className="text-gray-500 text-sm">Engagement: {engagementScore}%</p>
              {contact.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {contact.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex gap-4">
                <button className="text-blue-600 text-base font-semibold hover:underline" onClick={() => alert(`Calling ${contact.name}`)}>📞</button>
                <button className="text-green-600 text-base font-semibold hover:underline" onClick={() => alert(`Texting ${contact.name}`)}>💬</button>
                <button className="text-pink-600 text-base font-semibold hover:underline" onClick={() => alert(`Sending gift to ${contact.name}`)}>🎁</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TreeView;
