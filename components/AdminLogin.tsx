"use client";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";
export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const j = await r.json();
    if (r.ok) location.reload();
    else setError(j.error || "Giriş yapılamadı.");
    setBusy(false);
  };
  return (
    <main className="technical-paper grid min-h-screen place-items-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md border border-[var(--line)] bg-white/75 p-8 shadow-[0_30px_100px_rgba(23,35,38,.12)]"
      >
        <LockKeyhole className="text-[var(--teal-dark)]" />
        <p className="mt-8 text-[10px] font-bold uppercase tracking-[.2em] text-[var(--teal-dark)]">
          Çalışan Yapı
        </p>
        <h1 className="font-display mt-2 text-5xl">Yönetim girişi</h1>
        <div className="mt-8 space-y-5">
          <label>
            <span className="label">E-posta</span>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <span className="label">Şifre</span>
            <input
              className="field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p className="mt-4 text-sm text-red-800">{error}</p>}
        <button className="btn-primary mt-7 w-full" disabled={busy}>
          {busy ? "Kontrol ediliyor…" : "Giriş yap"}
        </button>
      </form>
    </main>
  );
}
