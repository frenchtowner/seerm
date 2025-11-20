"use client";

import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto p-6 space-y-10">

        {/* Auth Form */}
        <div className="bg-white p-6 rounded shadow-md border">
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 border rounded ${authMode === "login" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
              onClick={() => setAuthMode("login")}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 border rounded ${authMode === "register" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
              onClick={() => setAuthMode("register")}
            >
              Register
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              {authMode === "login" ? "Log In" : "Sign Up"}
            </button>
          </div>
        </div>

        import Link from "next/link"

        // Then inside your return JSX, anywhere you'd like:
        <Link href="/add-contact">
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
            ➕ Add New Contact
          </button>
        </Link>


        {/* Theme Picker */}
        <div className="space-y-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🎨 Pick Your Style
          </h1>

          <div className="bg-red-500 text-white p-4">If this is red, Tailwind works</div>

          {/* Zombie Mode */}
          <div className="flex items-start space-x-6 bg-white p-4 rounded shadow border">
            <img
              src="/images/Carl-in-red.png"
              alt="Zombie Mode"
              className="block w-32 h-auto rounded"
            />
            <div>
              <h2 className="text-xl font-bold">Zombie Mode</h2>
              <p className="italic text-gray-600">Reanimate forgotten leads.</p>
            </div>
          </div>

          {/* Tree View */}
          <div className="flex items-start space-x-6 bg-white p-4 rounded shadow border">
            <img
              src="/images/Apple-no-bg.png"
              alt="Tree View"
              className="block w-32 h-auto rounded"
            />
            <div>
              <h2 className="text-xl font-bold">Tree View</h2>
              <p className="italic text-gray-600">Grow and harvest your CRM orchard.</p>
            </div>
          </div>

          {/* Starship Console (template, you can uncomment once image is ready) */}
          {/* <div className="flex items-start space-x-6 bg-white p-4 rounded shadow border">
            <img
              src="/images/Starship.png"
              alt="Starship Console"
              className="w-32 h-auto rounded"
            />
            <div>
              <h2 className="text-xl font-bold">Starship Console</h2>
              <p className="italic text-gray-600">
                Navigate your contacts with tactical precision.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}
