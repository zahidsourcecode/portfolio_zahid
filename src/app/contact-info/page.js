"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Globe,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import PageLoadingState from "../components/PageLoadingState";

const QUICK_LINK_ICONS = {
  mail: Mail,
  globe: Globe,
  phone: Phone,
  bookOpen: BookOpen,
  mapPin: MapPin,
};

export default function ContactInfo() {
  const [contactInfoData, setContactInfoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContactInfoData() {
      try {
        const response = await fetch("/api/contact-info");

        if (!response.ok) {
          throw new Error("Failed to load contact card data");
        }

        const data = await response.json();

        if (!cancelled) {
          setContactInfoData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load contact card data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadContactInfoData();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="page-gradient relative flex min-h-screen min-w-0 flex-col items-center justify-center overflow-x-hidden px-3 pb-4 pt-16 sm:px-4 sm:pb-4 sm:pt-20">
        <PageLoadingState icon="userRound" message="Loading contact card…" />
      </main>
    );
  }

  if (error || !contactInfoData) {
    return (
      <main className="page-gradient relative flex min-h-screen min-w-0 flex-col items-center justify-center overflow-x-hidden px-3 pb-4 pt-16 sm:px-4 sm:pb-4 sm:pt-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-slate-500 dark:text-slate-400" role="alert">
            {error || contactInfoData?.pageState?.errorText || "Contact card data is unavailable."}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand/30 px-4 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand/10 dark:text-brand"
          >
            {contactInfoData?.pageState?.retryLabel || "Try again"}
          </button>
        </div>
      </main>
    );
  }

  const { header, profile, contactItems, footer } = contactInfoData;

  return (
    <main className="page-gradient relative flex !min-h-0 min-w-0 flex-col items-center overflow-x-hidden px-3 pb-2 pt-16 sm:px-4 sm:pb-3 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full opacity-20 sm:h-80 sm:w-80"
        style={{
          background: "radial-gradient(circle, #5ebed5 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 -left-16 h-56 w-56 rounded-full opacity-10 sm:h-72 sm:w-72"
        style={{
          background: "radial-gradient(circle, #5ebed5 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-lg">
        <article className="overflow-hidden rounded-3xl border border-brand/20 bg-white shadow-xl shadow-brand/15 dark:border-brand/15 dark:bg-slate-900">
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-muted px-5 pb-6 pt-4 sm:px-7 sm:pb-[6.25rem] sm:pt-5">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <pattern
                  id="contact-dots"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contact-dots)" />
            </svg>

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/80">
                  {header.eyebrow}
                </p>
                <h1 className="mt-0.5 font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-[1.65rem]">
                  {header.title}
                </h1>
              </div>
              <span className="hidden rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/90 sm:inline-block">
                {header.badge}
              </span>
            </div>
          </div>

          <div className="relative bg-white px-5 sm:px-7 dark:bg-slate-900">
            <div className="border-b border-brand/10 pb-4 pt-3 dark:border-brand/10 sm:pt-4">
              <div className="flex flex-col items-center gap-3 text-center sm:block sm:text-left">
                <div className="group relative -mt-9 h-36 w-28 shrink-0 cursor-pointer overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg ring-2 ring-brand/15 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/25 sm:absolute sm:-top-[5.35rem] sm:right-5 sm:mt-0 sm:h-44 sm:w-32">
                  <img
                    src={profile.image}
                    alt={profile.imageAlt}
                    className="h-full w-full bg-white object-cover object-[center_12%] transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="group/name w-full sm:w-fit sm:pr-[9.5rem]">
                  <p className="font-[family-name:var(--font-playfair)] text-xl font-bold leading-tight sm:text-[1.35rem]">
                    <span className="text-slate-900 transition-colors duration-300 group-hover/name:text-brand dark:text-white dark:group-hover/name:text-brand">
                      {profile.firstName}{" "}
                    </span>
                    <span className="text-brand transition-colors duration-300 group-hover/name:text-brand-dark dark:text-brand dark:group-hover/name:text-brand-muted">
                      {profile.lastName}
                    </span>
                  </p>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 sm:justify-start dark:text-slate-400">
                    <UserRound size={14} className="shrink-0 text-brand" strokeWidth={2.2} />
                    {profile.title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ul className="divide-y divide-brand/10 dark:divide-brand/10">
            {contactItems.map(({ label, icon, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group flex items-start gap-3.5 px-5 py-4 transition-colors hover:bg-brand-light/35 dark:hover:bg-brand/5 sm:px-7"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/15 bg-brand-light/40 transition-transform group-hover:scale-105 dark:bg-slate-800/80">
                    <img src={icon} alt="" className="h-7 w-7 object-contain" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                      {label}
                    </span>
                    <span className="mt-1 block break-words text-sm font-medium text-slate-800 transition-colors group-hover:text-brand-dark dark:text-slate-200 dark:group-hover:text-brand">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-brand/10 bg-gradient-to-b from-brand-light/20 to-transparent px-5 py-5 dark:from-brand/5 sm:px-7">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {footer.messageBefore}{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-200">
                {footer.responseTime}
              </strong>
              {footer.messageAfter}
            </p>
            <Link
              href={footer.cta.href}
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30 sm:w-auto"
            >
              {footer.cta.label}
              <ArrowRight size={16} />
            </Link>

            <div className="mt-5 flex flex-wrap gap-2">
              {footer.quickLinks.map(({ icon, label, href, external }) => {
                const Icon = QUICK_LINK_ICONS[icon] || Mail;

                return (
                  <QuickLink
                    key={label}
                    href={href}
                    icon={Icon}
                    label={label}
                    external={external}
                  />
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

function QuickLink({ href, icon: Icon, label, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-brand/20 bg-white/80 px-3 py-2 text-xs font-semibold text-brand-dark transition-colors hover:border-brand hover:bg-brand-light/50 dark:bg-slate-800/80 dark:text-brand dark:hover:bg-brand/10"
    >
      <Icon size={13} strokeWidth={2.2} />
      {label}
    </a>
  );
}
