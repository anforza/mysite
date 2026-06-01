"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setError("");
    setLoading(true);
    const payload = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <div className="container-page py-20">
      <form action={onSubmit} className="mx-auto max-w-md space-y-4 rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border p-2" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded border p-2" />
        <button disabled={loading} className="rounded bg-brand-700 px-4 py-2 text-white">
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </div>
  );
}
