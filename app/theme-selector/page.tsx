// ThemeSelector.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/ThemeContext";
import ZombieView from "@/components/ZombieView";
import TreeView from "@/components/TreeView";
import StarshipView from "@components/StarshipView";
import RingGatesView from "@/components/RingGatesView";
import EVAView from "@/components/EVAView";
import ZombieGardenView from "@/components/ZombieGardenView";

const fakeContacts = [
  {
    id: "1",
    user_id: "demo",
    name: "Carl Spongeworth",
    email: "carl@nowhere.biz",
    phone: "555-0000",
    status: "critical",
    urgency: 5,
    last_contact_date: "2024-12-01",
    tags: ["sponge?", "ghosted-client"],
    created_at: "2024-01-01",
  },
  {
    id: "2",
    user_id: "demo",
    name: "Beverly Beloved",
    email: "bev@heartmail.com",
    phone: "555-1111",
    status: "healthy",
    urgency: 1,
    last_contact_date: "2025-04-01",
    tags: ["beloved", "advocate"],
    created_at: "2024-02-02",
  },
  {
    id: "3",
    user_id: "demo",
    name: "Rico Hostile",
    email: "rico@rage.zone",
    phone: "555-2222",
    status: "neglected",
    urgency: 4,
    last_contact_date: "2024-11-15",
    tags: ["hostile", "bad-info"],
    created_at: "2024-03-03",
  },
];

const themes = [
  {
    name: "zombie",
    title: "Zombie Mode",
    tagline: "Reanimate forgotten leads.",
    screenshotUrl: "/screenshots/zombie.png",
    previewPath: "/preview",
  },
  {
    name: "tree",
    title: "Tree View",
    tagline: "Grow and harvest your CRM orchard.",
    screenshotUrl: "/screenshots/tree.png",
    previewPath: "/preview",
  },
  {
    name: "starship",
    title: "Starship Console",
    tagline: "Navigate your contacts with tactical precision.",
    screenshotUrl: "/screenshots/starship.png",
    previewPath: "/preview",
  },
  {
    name: "ringgates",
    title: "Ring Gates",
    tagline: "Urgency warps reality. Handle with care.",
    screenshotUrl: "/screenshots/ringgates.png",
    previewPath: "/preview",
  },
  {
    name: "eva",
    title: "EVA Drift",
    tagline: "Minimal. Intentional. Existential.",
    screenshotUrl: "/screenshots/eva.png",
    previewPath: "/preview",
  },
];

export function ThemePreviewLoader() {
  const { theme } = useTheme();

  switch (theme) {
    case "zombie":
      return <ZombieGardenView data={fakeContacts} />;
    case "tree":
      return <TreeView data={fakeContacts} />;
    case "starship":
      return <StarshipView data={fakeContacts} />;
    case "ringgates":
      return <RingGatesView data={fakeContacts} />;
    case "eva":
      return <EVAView data={fakeContacts} />;
    default:
      return <div className="text-white p-6">Unknown theme selected.</div>;
  }
}

export default function ThemeSelector() {
  const { setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      router.push("/preview");
    }
  }, [setTheme, router]);

  const chooseTheme = (theme: string, path: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
      🧠 Theme Selector Works!
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {themes.map((theme) => (
          <div
            key={theme.name}
            onClick={() => chooseTheme(theme.name, theme.previewPath)}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={theme.screenshotUrl}
              alt={theme.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{theme.title}</h2>
              <p className="text-sm text-gray-400 italic">{theme.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { fakeContacts };
