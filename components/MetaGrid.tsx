"use client";

import React from "react";
import { Contact } from "@/types";
import { urgencyColor } from "@/lib/urgencyColor";

interface MetaGridProps {
    contacts: Contact[];
    lastContactMap: Record<string, { date: string; method: string }>;
    onClose: () => void;
}

export default function MetaGrid({ contacts, lastContactMap, onClose }: MetaGridProps) {
    return (
        <>
            <div onClick={onClose} className="fixed inset-0 z-30" />
            <div
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40"
                onClick={onClose}
            >
                <div
                    className="grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-2 bg-white p-4 rounded-lg relative w-full max-w-5xl"
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

                        return (
                            <div
                                key={c.id}
                                className="relative group w-16 h-16 flex items-center justify-center text-xs font-bold text-white cursor-pointer"
                                style={{ backgroundColor: color }}
                            >
                                <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">
                                    {c.name}
                                </div>
                                {c.name}
                            </div>
                        );
                    })}

                    <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-2 rounded shadow-md text-xs">
                        <div><span className="inline-block w-3 h-3 bg-red-500 mr-2 rounded-full"></span> Critical</div>
                        <div><span className="inline-block w-3 h-3 bg-orange-400 mr-2 rounded-full"></span> High</div>
                        <div><span className="inline-block w-3 h-3 bg-yellow-400 mr-2 rounded-full"></span> Medium</div>
                        <div><span className="inline-block w-3 h-3 bg-green-400 mr-2 rounded-full"></span> Low</div>
                        <div><span className="inline-block w-3 h-3 bg-blue-300 mr-2 rounded-full"></span> Cool</div>
                        <div><span className="inline-block w-3 h-3 bg-gray-300 mr-2 rounded-full"></span> Dormant</div>
                    </div>
                </div>
            </div>
        </>
    );
}
