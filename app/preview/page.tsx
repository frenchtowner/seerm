"use client";

import React from "react";
import TreeView from "../../components/TreeView";

const fakeContacts = [
  {
    id: "1",
    user_id: "demo",
    name: "🍊 Beverly Beloved",
    status: "healthy",
    urgency: 2,
    created_at: "2025-01-01",
    tags: ["beloved", "advocate"]
  },
  {
    id: "2",
    user_id: "demo",
    name: "🥀 Carl Spongeworth",
    status: "critical",
    urgency: 5,
    created_at: "2025-01-02",
    tags: ["hostile", "ghosted-client"]
  },
];

export default function PreviewPage() {
  return (
    <main className="min-h-screen p-6 bg-white">
      <TreeView data={fakeContacts} />
    </main>
  );
}
