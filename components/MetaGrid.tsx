"use client";

import React, { useRef, useEffect, useState } from "react";
import { Contact } from "@/types";
import { urgencyColor } from "@/lib/urgencyColor";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL!,
    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface MetaGridProps {
    contacts: Contact[];
    lastContactMap: Record<string, { date: string; method: string }>;
    onClose: () => void;
}

export default function MetaGrid({ contacts, lastContactMap, onClose }: MetaGridProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [hovered, setHovered] = useState<Contact | null>(null);
    const [showKey, setShowKey] = useState(false);
    const tileRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        if (expandedId && tileRefs.current[expandedId]) {
            tileRefs.current[expandedId]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [expandedId]);

    const adjustFrequency = async (contact: Contact, delta: number) => {
        const current = contact.contact_frequency_days ?? 14;
        const updated = Math.max(1, current + delta);

        await supabase
            .from("contacts")
            .update({ contact_frequency_days: updated })
            .eq("id", contact.id);

        contact.contact_frequency_days = updated; // Local patch
        setHovered({ ...contact }); // Trigger re-render
    };

    const getDaysSince = (dateStr?: string) => {
        if (!dateStr) return null;
        const last = new Date(dateStr);
        const now = new Date();
        return Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    };

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowKey(true);
        setTimeout(() => setShowKey(false), 3000);
    };

    return (
        <>
            <div onClick={onClose} className="fixed inset-0 z-30" />
            <div
                className="fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center z-40 overflow-auto"
                onClick={onClose}
                onContextMenu={handleRightClick}
            >
                <div
                    className="grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-2 bg-white p-4 rounded-lg relative w-full max-w-5xl min-h-[60vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-2 right-2 text-black bg-white rounded-full px-2 py-1 shadow hover:bg-gray-200 text-xs z-50"
                    >
                        ❌
                    </button>

                    {contacts.map((c) => {
                        const urgency = Number(c.urgency) || 5;
                        const color = urgencyColor(urgency);
                        const isExpanded = expandedId === c.id;

                        return (
                            <div
                                key={c.id}
                                ref={(el) => (tileRefs.current[c.id] = el)}
                                onClick={() => setExpandedId(isExpanded ? null : c.id)}
                                onMouseEnter={() => setHovered(c)}
                                onMouseLeave={() => setHovered(null)}
                                className={`relative group w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center text-xs font-bold text-white cursor-pointer rounded transition-all duration-300 overflow-hidden ${isExpanded ? "h-auto min-h-[8rem] p-4" : ""
                                    }`}
                                style={{ backgroundColor: color }}
                            >
                                <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                    {c.name}
                                </div>

                                <div className="text-center w-full">
                                    <div className="text-sm font-bold">{c.name}</div>
                                    {isExpanded && (
                                        <div className="mt-3 space-y-1 text-[11px] pb-6 sm:pb-10 md:pb-16">
                                            <div className="bg-white text-black px-2 py-1 rounded w-full text-center">
                                                Orbit Controls
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Hover HUD */}
                    {hovered && (
                        <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-lg shadow-xl rounded-xl p-4 text-xs w-72 space-y-2 z-[100] border border-gray-300">
                            <div className="text-base font-semibold text-black">{hovered.name}</div>
                            <div>Status: {hovered.status}</div>
                            <div>
                                Last Contacted:{" "}
                                {lastContactMap[hovered.id]
                                    ? `${getDaysSince(lastContactMap[hovered.id].date)} days ago via ${lastContactMap[hovered.id].method}`
                                    : "No data"}
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Frequency:</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => adjustFrequency(hovered, -1)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span>{hovered.contact_frequency_days ?? 14} days</span>
                                    <button
                                        onClick={() => adjustFrequency(hovered, 1)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                Orbit Health:{" "}
                                {(() => {
                                    const days = getDaysSince(lastContactMap[hovered.id]?.date);
                                    const freq = hovered.contact_frequency_days ?? 14;
                                    if (days == null) return "Unknown";
                                    if (days <= freq) return "🟢 On Time";
                                    return "🔴 Overdue";
                                })()}
                            </div>
                            {hovered.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-2">
                                    {hovered.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 text-[10px] bg-blue-100 text-blue-800 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Right-Click Urgency Key */}
                    {showKey && (
                        <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg text-xs w-40 border border-gray-300 z-50">
                            <div className="text-sm font-semibold mb-2 text-gray-600">Urgency Key</div>
                            <div><span className="inline-block w-3 h-3 bg-red-500 mr-2 rounded-full"></span> Critical</div>
                            <div><span className="inline-block w-3 h-3 bg-orange-400 mr-2 rounded-full"></span> High</div>
                            <div><span className="inline-block w-3 h-3 bg-yellow-400 mr-2 rounded-full"></span> Medium</div>
                            <div><span className="inline-block w-3 h-3 bg-green-400 mr-2 rounded-full"></span> Low</div>
                            <div><span className="inline-block w-3 h-3 bg-blue-300 mr-2 rounded-full"></span> Cool</div>
                            <div><span className="inline-block w-3 h-3 bg-gray-300 mr-2 rounded-full"></span> Dormant</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
