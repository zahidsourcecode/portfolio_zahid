"use client";

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

const contactItems = [
  {
    icon: "/call-icon.png",
    label: "Phone",
    value: "+880 1704 038252",
    href: "tel:+8801704038252",
    external: false,
  },
  {
    icon: "/mail-icon.png",
    label: "Email",
    value: "zahidcseedu@yahoo.com",
    href: "mailto:zahidcseedu@yahoo.com",
    external: false,
  },
  {
    icon: "/linkedin-icon.png",
    label: "LinkedIn",
    value: "linkedin.com/in/zahidcseedu",
    href: "https://linkedin.com/in/zahidcseedu",
    external: true,
  },
  {
    icon: "/book-icon.png",
    label: "Blog",
    value: "ixorasolution.com/author/zh",
    href: "https://ixorasolution.com/author/zh/",
    external: true,
  },
  {
    icon: "/globe-icon.png",
    label: "Portfolio",
    value: "zahid-career.vercel.app",
    href: "https://zahid-career.vercel.app/",
    external: true,
  },
  {
    icon: "/location-icon.png",
    label: "Address",
    value: "Block-A, Aftabnagar, Rampura, Dhaka, Bangladesh",
    href: "https://www.google.com/maps/place/BTI+Chorus/@23.768061,90.4201549,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c7005f87ef3f:0x601cd5d9a9d4ccd3!8m2!3d23.7680562!4d90.4250258!16s%2Fg%2F11ldxmv1cp?entry=ttu",
    external: true,
  },
];

export default function ContactInfo() {
  return (
    <main className="page-gradient relative flex min-w-0 flex-col items-center overflow-x-hidden px-3 pb-10 pt-16 sm:px-4 sm:pb-12 sm:pt-20">
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
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-muted px-5 pb-8 pt-6 sm:px-7 sm:pb-[8.75rem] sm:pt-7">
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
                  Contact
                </p>
                <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-[1.65rem]">
                  Contact Info
                </h1>
              </div>
              <span className="hidden rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/90 sm:inline-block">
                EU-ready
              </span>
            </div>
          </div>

          {/* Profile */}
          <div className="relative bg-white px-5 sm:px-7 dark:bg-slate-900">
            <div className="border-b border-brand/10 pb-5 pt-4 dark:border-brand/10 sm:pt-5">
              <div className="flex flex-col items-center gap-4 text-center sm:block sm:text-left">
                <div className="group relative -mt-10 h-36 w-28 shrink-0 cursor-pointer overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg ring-2 ring-brand/15 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/25 sm:absolute sm:-top-[6.5rem] sm:right-5 sm:mt-0 sm:h-48 sm:w-36">
                  <img
                    src="/contact-profile.png"
                    alt="Zahid Hasan"
                    className="h-full w-full bg-white object-cover object-[center_12%] transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="group/name w-full sm:w-fit sm:pr-[10.5rem]">
                  <p className="font-[family-name:var(--font-playfair)] text-xl font-bold leading-tight sm:text-[1.35rem]">
                    <span className="text-slate-900 transition-colors duration-300 group-hover/name:text-brand dark:text-white dark:group-hover/name:text-brand">
                      Zahid{" "}
                    </span>
                    <span className="text-brand transition-colors duration-300 group-hover/name:text-brand-dark dark:text-brand dark:group-hover/name:text-brand-muted">
                      Hasan
                    </span>
                  </p>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 sm:justify-start dark:text-slate-400">
                    <UserRound size={14} className="shrink-0 text-brand" strokeWidth={2.2} />
                    Technical Team Lead
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact list */}
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

          {/* Footer CTA */}
          <div className="border-t border-brand/10 bg-gradient-to-b from-brand-light/20 to-transparent px-5 py-6 dark:from-brand/5 sm:px-7">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Want to reach out directly? Send a message and I&apos;ll get back to
              you within{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-200">
                1–2 business days
              </strong>
              .
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30 sm:w-auto"
            >
              Send me a message
              <ArrowRight size={16} />
            </Link>

            <div className="mt-5 flex flex-wrap gap-2">
              <QuickLink href="mailto:zahidcseedu@yahoo.com" icon={Mail} label="Email" />
              <QuickLink
                href="https://linkedin.com/in/zahidcseedu"
                icon={Globe}
                label="LinkedIn"
                external
              />
              <QuickLink href="tel:+8801704038252" icon={Phone} label="Call" />
              <QuickLink href="/blog" icon={BookOpen} label="Blog" />
              <QuickLink
                href="https://www.google.com/maps/place/BTI+Chorus/@23.768061,90.4201549,17z"
                icon={MapPin}
                label="Map"
                external
              />
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
      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-brand/20 bg-white/80 px-3 py-2 text-xs font-semibold text-brand-dark transition-colors hover:border-brand hover:bg-brand-light/50 dark:bg-slate-800/80 dark:text-brand dark:hover:bg-brand/10"
    >
      <Icon size={13} strokeWidth={2.2} />
      {label}
    </a>
  );
}
