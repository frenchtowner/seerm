"use client";

import React, { useState } from "react";
import { Contact } from "@/types";

interface ComposerProps {
    contact: Contact | undefined;
    method: 'email' | 'text' | null;
    onClose: () => void;
    onSend: (id: string, method: string) => void;
}

export default function Composer({ contact, method, onClose, onSend }: ComposerProps) {
    const [messageText, setMessageText] = useState("");

    if (!contact || !method) return null;

    return (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white p-4 rounded shadow-lg w-96 relative"
                onClick={(e) => e.stopPropagation()} // prevent closing if clicking inside
            >
                <h2 className="text-lg font-bold mb-2">
                    {method === 'email' ? 'Compose Email' : 'Send Text'}
                </h2>

                <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
                />

                <div className="flex justify-end space-x-2">
                    <button
                        className="px-3 py-1 bg-gray-300 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                        onClick={() => {
                            if (contact.id && method) {
                                onSend(contact.id, method);
                                console.log(`FAUX ${method.toUpperCase()} to ${contact.name}:`, messageText);
                                setMessageText("");
                                onClose();
                            }
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
