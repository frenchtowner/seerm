"use client";

import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log("Beta signup:", email);
    setSubmitted(true);
  };

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Connect Tree — SaaS with Sass</title>
        <meta
          name="description"
          content="Connect Tree is the CRM that doesn’t ghost your leads — it roasts you into following up. Relationship-driven sales tools with bite."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-center mb-6">
          Connect Tree
        </h1>
        <p className="text-xl sm:text-2xl text-center max-w-2xl mb-10">
          The CRM that remembers your leads better than you remember your own
          dreams.
          <br />
          Emotionally intelligent. Lightly judgmental. Ridiculously useful.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="px-4 py-3 rounded w-full text-black"
            />
            <button
              type="submit"
              className="bg-lime-500 text-black px-6 py-3 rounded font-semibold hover:bg-lime-400"
            >
              Join Beta
            </button>
          </form>
        ) : (
          <p className="text-lime-400 text-lg mt-4">
            You’re in. Feed the sponge.
          </p>
        )}

        <footer className="mt-20 text-sm text-neutral-500 text-center">
          Built with sarcasm and Tailwind CSS. <br />
          This is SaaS with Sass™.
        </footer>
      </main>
    </>
  );
}