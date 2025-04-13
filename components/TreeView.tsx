// TreeView.tsx (Fruit-Driven CRM — Color & Size Logic)
"use client";

import React from "react";
import { Contact } from "@/types";

function getFruitStyle(urgency: number, tags?: string[]): string {
  if (tags?.includes("ghosted-client")) return "grayscale opacity-60";
  if (urgency >= 6) return "animate-bounce drop-shadow-xl saturate-200";
  if (urgency >= 5) return "animate-pulse drop-shadow-md saturate-150";
  if (urgency >= 4) return "saturate-100";
  if (urgency >= 3) return "saturate-75";
  if (urgency >= 2) return "saturate-50";
  return "opacity-50";
}

function getFruitSize(urgency: number): string {
  if (urgency >= 6) return "w-48 h-48";
  if (urgency >= 5) return "w-44 h-44";
  if (urgency >= 4) return "w-40 h-40";
  if (urgency >= 3) return "w-36 h-36";
  if (urgency >= 2) return "w-32 h-32";
  return "w-28 h-28";
}

function getFruitImageSrc(): string {
  return "/images/Apple-no-bg.png";
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
    urgency: 6,
    tags: ["beloved"],
    last_contact_date: "2024-04-01",
    contact_frequency_days: 7,
    notes: "Loyal and kind.",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "u1",
    name: "Raj",
    email: "raj@example.com",
    phone: "555-0003",
    mailing_address: "3 Lotus Way",
    status: "healthy",
    urgency: 4,
    tags: ["advocate"],
    last_contact_date: "2024-04-02",
    contact_frequency_days: 14,
    notes: "Refers others.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: "u1",
    name: "Zara",
    email: "zara@example.com",
    phone: "555-0004",
    mailing_address: "4 Citrus Blvd",
    status: "neglected",
    urgency: 3,
    tags: ["cold-client"],
    last_contact_date: "2024-03-15",
    contact_frequency_days: 60,
    notes: "Needs warming.",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    user_id: "u1",
    name: "Leo",
    email: "leo@example.com",
    phone: "555-0005",
    mailing_address: "5 Hostile Rd",
    status: "critical",
    urgency: 5,
    tags: ["hostile"],
    last_contact_date: "2024-01-01",
    contact_frequency_days: 90,
    notes: "Yelled once.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    user_id: "u1",
    name: "Juno",
    email: "juno@example.com",
    phone: "555-0006",
    mailing_address: "6 Garden Path",
    status: "healthy",
    urgency: 2,
    tags: ["friendly-client"],
    last_contact_date: "2024-04-05",
    contact_frequency_days: 21,
    notes: "Always replies.",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    user_id: "u1",
    name: "Miles",
    email: "miles@example.com",
    phone: "555-0007",
    mailing_address: "7 Orbit Ln",
    status: "neglected",
    urgency: 3,
    tags: ["cold-client"],
    last_contact_date: "2024-02-20",
    contact_frequency_days: 45,
    notes: "Just orbiting.",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    user_id: "u1",
    name: "Vera",
    email: "vera@example.com",
    phone: "555-0008",
    mailing_address: "8 Plum Dr",
    status: "critical",
    urgency: 5,
    tags: ["bad-info"],
    last_contact_date: "2024-01-10",
    contact_frequency_days: 90,
    notes: "Needs update.",
    created_at: new Date().toISOString(),
  }
];

function TreeView({ data }: { data?: Contact[] }) {
  const displayData = sampleData;

  return (
    <div className="p-10 min-h-screen bg-green-50 grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
      {displayData.map((contact) => {
        const style = getFruitStyle(contact.urgency, contact.tags);
        const size = getFruitSize(contact.urgency);

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
            <div className="opacity-0 group-hover:opacity-100 absolute -top-32 left-1/2 -translate-x-1/2 w-max text-base text-gray-700 bg-white px-6 py-4 rounded shadow-lg transition-opacity z-10">
              <p className="font-semibold text-lg">{contact.name}</p>
              <p className="text-gray-500 text-sm">Urgency: {contact.urgency}</p>
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
