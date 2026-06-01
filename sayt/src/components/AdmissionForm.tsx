"use client";

import { useState } from "react";

export function AdmissionForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/applications", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit");
      setMessage("Application submitted successfully.");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-4 rounded-xl border bg-white p-4">
      <input required name="fullName" placeholder="Full name" className="w-full rounded border p-2" />
      <input required type="email" name="email" placeholder="Email" className="w-full rounded border p-2" />
      <input required name="phone" placeholder="Phone" className="w-full rounded border p-2" />
      <input required name="program" placeholder="Program name" className="w-full rounded border p-2" />
      <input type="file" name="document" className="w-full rounded border p-2" />
      <button disabled={loading} className="rounded bg-brand-700 px-4 py-2 text-white disabled:opacity-50">
        {loading ? "Submitting..." : "Submit Application"}
      </button>
      {message ? <p className="text-sm">{message}</p> : null}
    </form>
  );
}
