"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    const formData = new FormData(form);

    // Bot honeypot check
    if (formData.get("website")) {
      setStatus("sent");
      form.reset();
      return;
    }

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject") || "Portfolio Contact",
      message: formData.get("body"),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-2xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required maxLength={120} placeholder="Your name" className="field" aria-label="Your name" />
        <input name="email" type="email" required maxLength={200} placeholder="Email address" className="field" aria-label="Email address" />
      </div>
      <input name="subject" maxLength={200} placeholder="Subject (optional)" className="field" aria-label="Subject" />
      <textarea name="body" required rows={5} maxLength={5000} placeholder="Your message" className="field resize-y" aria-label="Message" />
      {/* Honeypot: hidden from people, tempting to bots */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send message
        </button>
        <p role="status" className="text-sm">
          {status === "sent" && <span className="text-emerald-600 dark:text-emerald-400">Thanks – your message was sent.</span>}
          {status === "error" && <span className="text-red-600 dark:text-red-400">{error}</span>}
        </p>
      </div>
    </form>
  );
}
