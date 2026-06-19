"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || loading) return;

    setLoading(true);
    setError("");
    setReply("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const data: { reply?: string; error?: string } = await response.json();
      if (!response.ok || !data.reply) {
        throw new Error(data.error || "The assistant did not return a response.");
      }

      setReply(data.reply);
    } catch (requestError: unknown) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to contact the assistant."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 p-5 md:py-10">
      <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
        Back to home
      </Link>
      <h1 className="text-2xl font-bold mb-5">
        Land Record AI Assistant
      </h1>

      <label htmlFor="chat-message" className="mb-2 block font-medium">
        Your question
      </label>
      <textarea
        id="chat-message"
        className="w-full rounded border border-slate-300 bg-white p-3 text-slate-900"
        rows={4}
        maxLength={2000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything about land records..."
      />

      <button
        type="button"
        onClick={sendMessage}
        disabled={loading || !message.trim()}
        className="mt-3 rounded bg-sky-700 px-5 py-2 text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {reply && (
        <section className="mt-5 rounded border border-slate-200 bg-white p-4 text-slate-900" aria-live="polite">
          <h3 className="font-semibold">Response:</h3>
          <p className="mt-2 whitespace-pre-wrap">{reply}</p>
        </section>
      )}

      {error && (
        <p className="mt-5 rounded border border-red-300 bg-red-50 p-4 text-red-700" role="alert">
          {error}
        </p>
      )}
    </main>
  );
}
