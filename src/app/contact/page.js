"use client";

import Link from "next/link";
import { ArrowRight, Globe, Linkedin, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import ContactForm from "../components/ContactForm";

const quickContact = [
  {
    icon: Mail,
    label: "Email",
    value: "zahidcseedu@yahoo.com",
    href: "mailto:zahidcseedu@yahoo.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1704 038252",
    href: "tel:+8801704038252",
  },
  {
    icon: Globe,
    label: "Website",
    value: "zahid-career.vercel.app",
    href: "https://zahid-career.vercel.app/",
    external: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/zahidcseedu",
    href: "https://linkedin.com/in/zahidcseedu",
    external: true,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh · Remote EU",
    href: "https://www.google.com/maps/place/BTI+Chorus/@23.768061,90.4201549,17z",
    external: true,
  },
];

export default function Contact() {
  return (
    <main className="page-gradient relative min-w-0 overflow-x-hidden px-3 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20">
      <div className="relative mx-auto w-full max-w-5xl min-w-0">
        <header className="mb-8 sm:mb-10">
          <div className="mb-2 flex items-center gap-2">
            <MessageSquare size={20} className="text-brand" strokeWidth={2.2} />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark dark:text-brand">
              Contact
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Get in touch
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Open to technical team lead and full-stack roles. Send a message below
            or reach out directly — I usually reply within 1–2 business days.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-5 lg:items-stretch lg:gap-8">
          <aside className="flex lg:col-span-2">
            <div className="flex w-full flex-1 flex-col rounded-2xl border border-brand/20 bg-white p-5 shadow-md shadow-brand/10 dark:border-brand/15 dark:bg-slate-900 sm:p-6">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Other ways to reach me
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Direct links if you prefer not to use the form.
              </p>

              <ul className="mt-5 space-y-4">
                {quickContact.map(({ icon: Icon, label, value, href, external }) => (
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
                ))}
              </ul>

              <div className="mt-auto border-t border-brand/10 pt-5 dark:border-brand/10">
                <Link
                  href="/contact-info"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-darker dark:text-brand"
                >
                  View contact card
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>

          <section className="flex lg:col-span-3">
            <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-brand/20 bg-white shadow-lg shadow-brand/10 dark:border-brand/15 dark:bg-slate-900">
              <div className="border-b border-brand/10 bg-gradient-to-r from-brand/10 via-brand-light/30 to-transparent px-5 py-4 dark:from-brand/10 dark:via-slate-800/80 dark:to-transparent sm:px-6">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Send a message
                </h2>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  Fill in the form and I&apos;ll get back to you.
                </p>
              </div>
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
