"use client";

import React, { useState, useEffect } from "react";

export default function ContactUploaderExploder() {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("contacts");
    if (stored) setContacts(JSON.parse(stored));
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        localStorage.setItem("contacts", JSON.stringify(json));
        setContacts(json);
        alert("Contacts imported!");
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const exportContacts = () => {
    const data = localStorage.getItem("contacts");
    const blob = new Blob([data || "[]"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.json";
    a.click();
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📦 Contact Uploader / Exploder</h1>

      <input type="file" accept=".json" onChange={handleFileUpload} />

      <button
        onClick={exportContacts}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export Contacts
      </button>

      <div>
        <h2 className="text-xl mt-4">Current Contacts</h2>
        <ul className="mt-2 list-disc list-inside">
          {contacts.map((c) => (
            <li key={c.id}>{c.name} — urgency {c.urgency}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
