"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Globe, Linkedin, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import ContactForm from "../components/ContactForm";
import PageLoadingState from "../components/PageLoadingState";

const QUICK_CONTACT_ICONS = {
  mail: Mail,
  phone: Phone,
  globe: Globe,
  linkedin: Linkedin,
  mapPin: MapPin,
};

export default function Contact() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContactData() {
      try {
        const response = await fetch("/api/contact");

        if (!response.ok) {
          throw new Error("Failed to load contact data");
        }

        const data = await response.json();

        if (!cancelled) {
          setContactData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load contact data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadContactData();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="page-gradient relative min-w-0 overflow-x-hidden px-3 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20">
        <div className="relative mx-auto w-full max-w-5xl min-w-0">
          <PageLoadingState icon="messageSquare" message="Loading contact data…" />
        </div>
      </main>
    );
  }

  if (error || !contactData) {
    return (
      <main className="page-gradient relative min-w-0 overflow-x-hidden px-3 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20">
        <div className="relative mx-auto flex w-full max-w-5xl min-w-0 flex-col items-center gap-3 text-center">
          <p className="text-slate-500 dark:text-slate-400" role="alert">
            {error || contactData?.pageState?.errorText || "Contact data is unavailable."}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full border border-brand/30 px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand/10 dark:text-brand"
          >
            {contactData?.pageState?.retryLabel || "Try again"}
          </button>
        </div>
      </main>
    );
  }

  const { header, sidebar, formSection, form, quickContact } = contactData;

  return (
    <main className="page-gradient relative min-w-0 overflow-x-hidden px-3 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20">
      <div className="relative mx-auto w-full max-w-5xl min-w-0">
        <header className="mb-8 sm:mb-10">
          <div className="mb-2 flex items-center gap-2">
            <MessageSquare size={20} className="text-brand" strokeWidth={2.2} />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark dark:text-brand">
              {header.eyebrow}
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {header.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            {header.description}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-5 lg:items-stretch lg:gap-8">
          <aside className="flex lg:col-span-2">
            <div className="flex w-full flex-1 flex-col rounded-2xl border border-brand/20 bg-white p-5 shadow-md shadow-brand/10 dark:border-brand/15 dark:bg-slate-900 sm:p-6">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                {sidebar.title}
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {sidebar.description}
              </p>

              <ul className="mt-5 space-y-4">
                {quickContact.map(({ icon, label, value, href, external }) => {
                  const Icon = QUICK_CONTACT_ICONS[icon] || Mail;

                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="group flex items-start gap-3"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-light/60 text-brand-dark dark:bg-brand/10 dark:text-brand">
                          <Icon size={17} strokeWidth={2.1} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {label}
                          </span>
                          <span className="mt-0.5 block break-words text-sm font-medium text-slate-800 transition-colors group-hover:text-brand-dark dark:text-slate-200 dark:group-hover:text-brand">
                            {value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto border-t border-brand/10 pt-5 dark:border-brand/10">
                <Link
                  href={sidebar.contactCardLink.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-darker dark:text-brand"
                >
                  {sidebar.contactCardLink.label}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>

          <section className="flex lg:col-span-3">
            <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-brand/20 bg-white shadow-lg shadow-brand/10 dark:border-brand/15 dark:bg-slate-900">
              <div className="border-b border-brand/10 bg-gradient-to-r from-brand/10 via-brand-light/30 to-transparent px-5 py-4 dark:from-brand/10 dark:via-slate-800/80 dark:to-transparent sm:px-6">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  {formSection.title}
                </h2>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  {formSection.description}
                </p>
              </div>
              <ContactForm form={form} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
