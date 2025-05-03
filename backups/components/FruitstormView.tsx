"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Contact } from "@/types";

async function fetchContactsFromSheet() {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRQnHM-0hWZayDCaKBce1JSJ8G15Quz4IBpTBUos9Mir4gkFR8_aXqi55KTzAXeSUHehSNd5HCdpxZ4/pub?output=csv'; // Replace with your published Google Sheet CSV URL
  const res = await fetch(sheetUrl);
  const text = await res.text();
  const rows = text.split('\n').map((row) => row.split(','));
  const [headers, ...data] = rows;

  return data
    .filter((row) => row.length > 1)
    .map((row) => {
      const contact: any = {};
      row.forEach((cell, index) => {
        const header = headers[index]?.trim().toLowerCase(); // <-- lowercase headers!
        if (header && cell) {
          contact[header.trim()] = cell.trim();
        }
      });
      return contact;
    });
}

function urgencyColor(urgency: number): string {
  const colors = ["#d1d5db", "#a5b4fc", "#6ee7b7", "#facc15", "#f97316", "#ef4444"];
  if (urgency >= 9) return colors[5];
  if (urgency >= 7) return colors[4];
  if (urgency >= 5) return colors[3];
  if (urgency >= 3) return colors[2];
  if (urgency >= 1) return colors[1];
  return colors[0];
}

export default function FruitstormView() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [metaGridOpen, setMetaGridOpen] = useState<boolean>(false);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [metaPanelPosition, setMetaPanelPosition] = useState<{ x: number; y: number } | null>(null);
  const [lastContactMap, setLastContactMap] = useState<Record<string, { date: string; method: string }>>({});
  const [showComposer, setShowComposer] = useState(false);
  const [messageMethod, setMessageMethod] = useState<'email' | 'text' | null>(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    async function loadContacts() {
      const fetchedContacts = await fetchContactsFromSheet();
      const safeContacts = fetchedContacts.map((c, index) => ({
        ...c,
        id: c.id || `contact-${index}-${Math.random().toString(36).substr(2, 5)}`,
        urgency: Number(c.urgency) || 5,
        status: c.status || "neglected",
      }));
      console.log("Safe Contacts:", safeContacts);
      setContacts(safeContacts);
    }
    loadContacts();
  }, []);

  const positionedContacts = useMemo(() => {
    return contacts.map((c) => ({
      ...c,
      x: Math.random() * 85 + 5,
      y: Math.random() * 85 + 5,
      floatSpeed: 15 - (c.urgency || 5) + Math.random() * 3,
    }));
  }, [contacts]);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMetaGridOpen(true);
  };

  const handleCloseMetaGrid = () => {
    setMetaGridOpen(false);
    setActiveContactId(null);
  };

  const getContactById = (id: string) => contacts.find((c) => c.id === id);

  const recordContact = ({ id, method }: { id: string; method: string }) => {
    const now = new Date();
    setLastContactMap((prev) => ({
      ...prev,
      [id]: { date: now.toLocaleString(), method }
    }));
    console.log(`✔️ Recorded ${method} for ${id} at ${now.toISOString()}`);
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white" onContextMenu={handleRightClick}>
      <style>{`
        @keyframes gentleFloat {
          0% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
          100% { transform: translate(-50%, -50%) translateY(0px); }
        }
        .modal-overlay {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {positionedContacts.map((c) => {
        const lastTouch = lastContactMap[c.id];
        const urgency = lastTouch ? 1 : c.urgency;
        const width = lastTouch ? 220 : urgency * (Math.random() > 0.5 ? 90 : 130);
        const height = lastTouch ? 150 : urgency * (Math.random() > 0.5 ? 70 : 120);
        const color = urgencyColor(Number(urgency));
        return (
          <div
            key={c.id}
            className="absolute"
            style={{
              top: `${c.y}vh`,
              left: `${c.x}vw`,
              width: `${width}px`,
              height: `${height}px`,
              transform: "translate(-50%, -50%)",
              animation: `gentleFloat ${c.floatSpeed}s ease-in-out infinite`,
              zIndex: activeContactId === c.id ? 50 : 10,
              backgroundColor: color,
              transition: 'all 0.7s ease-in-out',
            }}
            onMouseEnter={() => setHoveredId(c.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setActiveContactId(c.id)}
            role="button"
            tabIndex={0}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="text-xs font-bold text-white z-10">{c.name}</span>
              {lastTouch && (
                <div className="absolute bottom-1 text-[10px] text-white opacity-80 w-full text-center z-0">
                  {new Date(lastTouch.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: '2-digit' })} ({lastTouch.method === 'email' ? 'em' : lastTouch.method === 'text' ? 'tx' : 'gf'})
                </div>
                {/* Insert Tiny Buttons here! */}
              {activeContactId === c.id && (
                <div className="absolute bottom-2 flex space-x-2">
                  <button onClick={() => handleContact(c.id, 'email')} className="bg-blue-500 text-white rounded px-2 py-1 text-xs">✉️</button>
                  <button onClick={() => handleContact(c.id, 'text')} className="bg-green-500 text-white rounded px-2 py-1 text-xs">📱</button>
                  <button onClick={() => handleContact(c.id, 'gift')} className="bg-yellow-500 text-black rounded px-2 py-1 text-xs">🎁</button>
                </div>
              )}
            </div>
            {hoveredId === c.id && activeContactId !== c.id && (
              <div className="absolute top-full mt-2 p-3 bg-white text-black rounded shadow-lg w-40 z-[999] pointer-events-auto">
                <div className="font-bold text-center">{c.name}</div>
                <div className="text-xs text-center">Urgency: {c.urgency}</div>
                <div className="text-xs text-center">Status: {c.status}</div>
              </div>
            )}
          </div>
        );
      })}

      {/* MetaGrid and Composer JSX goes here... */}
      {metaGridOpen && (
        <>
          <div onClick={handleCloseMetaGrid} className="fixed inset-0 z-30" />
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40" onClick={handleCloseMetaGrid}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-2 bg-white p-4 rounded-lg relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => { e.stopPropagation(); handleCloseMetaGrid(); }}
                className="absolute top-2 right-2 text-black bg-white rounded-full px-2 py-1 shadow hover:bg-gray-200 text-xs z-50"
              >
                ❌
              </button>
              {contacts.map((c) => (
                <div
                  key={c.id}
                  className="relative group w-16 h-16 flex items-center justify-center text-xs font-bold text-white cursor-pointer"
                  style={{ backgroundColor: urgencyColor(c.urgency) }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setMetaPanelPosition({ x: rect.right + 10, y: rect.top });
                    setActiveContactId(c.id);
                  }}
                >
                  <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">
                    {c.name}
                  </div>
                </div>
              ))}
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
      )}

      {activeContactId && metaGridOpen && (
        <div className="absolute bg-white p-3 rounded shadow-lg z-50 w-48" style={{ top: metaPanelPosition?.y ?? 0, left: metaPanelPosition?.x ?? 0 }}>
          <h2 className="font-bold text-lg mb-2">{getContactById(activeContactId)?.name}</h2>
          <p className="text-sm">Status: {getContactById(activeContactId)?.status}</p>
          <p className="text-sm">Urgency: {getContactById(activeContactId)?.urgency}</p>
          <p className="text-xs text-gray-500 mt-2">Last Contact: {lastContactMap[activeContactId]?.date || '—'} ({lastContactMap[activeContactId]?.method || '—'})</p>
          <p className="text-xs text-gray-500">Type: —</p>
          <p className="text-xs text-gray-500">Notes: —</p>
        </div>
      )}
      {showComposer && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-96 relative">
            <h2 className="text-lg font-bold mb-2">
              {messageMethod === 'email' ? 'Compose Email' : 'Send Text'}
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
                onClick={() => setShowComposer(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => {
                  if (activeContactId && messageMethod) {
                    recordContact({ id: activeContactId, method: messageMethod });
                    console.log(
                      `FAUX ${messageMethod.toUpperCase()} to ${getContactById(activeContactId)?.name
                      }:`,
                      messageText
                    );
                    setShowComposer(false);
                    setMessageText('');
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
