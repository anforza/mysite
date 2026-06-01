"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="space-y-3 rounded-xl border bg-white p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input required className="w-full rounded border p-2" placeholder="Name" />
      <input required type="email" className="w-full rounded border p-2" placeholder="Email" />
      <textarea required className="w-full rounded border p-2" placeholder="Message" rows={4} />
      <button className="rounded bg-brand-700 px-4 py-2 text-white">Send</button>
      {sent ? <p className="text-sm text-green-700">Message sent.</p> : null}
    </form>
  );
}
