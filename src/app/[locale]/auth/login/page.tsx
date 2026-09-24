"use client";

import { useState } from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import { login } from "@/services/auth";
import { saveSession } from "@/services/session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const t = useTranslations("Login");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {    
    e.preventDefault();
    setError("");

    try {
      const user = await login(email, password);
      saveSession(user.id, user.userName);
      router.push("/plans");
    } catch (err) {
      setError(t("error"));
      console.log(err);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-5xl font-bold text-slate-900 mt-6">{t("title")}</h1>
      <p className="text-lg text-slate-600 mt-2">
        {t("description")}
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 mt-10 w-full max-w-md"
      >
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
          {t("email")}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
        />

        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mt-4">
          {t("password")}
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
        />

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-semibold rounded-xl py-4 mt-8"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
}