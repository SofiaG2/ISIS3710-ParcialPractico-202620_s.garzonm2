"use client";
import {useLocale, useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Header");
  return (
    <nav className="flex gap-2 text-sm text-slate-700" aria-label={t("language")}>
      <Link href={pathname} locale="es" className={locale === "es" ? "font-bold" : ""}>
        ES
      </Link>
      <span aria-hidden="true">|</span>
      <Link href={pathname} locale="en" className={locale === "en" ? "font-bold" : ""}>
        EN
      </Link>
    </nav>
  );
}