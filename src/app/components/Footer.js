"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/skills", label: "Skills" },
  { href: "/contact-info", label: "Contact" },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyrightClassName =
    "shrink-0 rounded-full border border-brand/25 bg-gradient-to-r from-brand/15 via-brand-light/60 to-brand/10 px-2 py-0.5 shadow-sm shadow-brand/10 dark:from-brand/10 dark:via-slate-800/80 dark:to-brand/5";

  return (
    <footer className="relative border-t border-brand/20 bg-gradient-to-r from-brand-light/30 via-white to-brand-light/20 backdrop-blur-md dark:border-brand/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
      />
      <div className="relative mx-auto flex h-10 max-w-6xl items-center gap-2 px-3 sm:h-11 sm:gap-3 sm:px-6">
        <p className={`${copyrightClassName} hidden items-center gap-1 text-[11px] leading-none sm:flex`}>
          <span className="font-semibold text-brand-dark dark:text-brand">© {year}</span>
          <span aria-hidden className="text-brand/35">
            ·
          </span>
          <span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">Zahid </span>
            <span className="font-semibold text-brand-dark dark:text-brand">Hasan</span>
          </span>
          <span aria-hidden className="text-brand/35">
            ·
          </span>
          <span className="font-medium text-slate-600 dark:text-slate-300">All rights reserved.</span>
        </p>

        <p className={`${copyrightClassName} flex min-w-0 max-w-[46%] flex-col gap-0.5 text-[8px] leading-tight sm:hidden`}>
          <span>
            <span className="font-semibold text-brand-dark dark:text-brand">© {year} </span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">Zahid </span>
            <span className="font-semibold text-brand-dark dark:text-brand">Hasan</span>
          </span>
          <span className="font-medium text-slate-600 dark:text-slate-300">All rights reserved.</span>
        </p>

        <nav
          aria-label="Footer navigation"
          className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-medium transition-colors sm:text-xs ${
                isActive(href)
                  ? "bg-brand/15 text-brand-dark dark:text-brand"
                  : "text-slate-500 hover:text-brand-dark dark:text-slate-400 dark:hover:text-brand"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-brand/25 bg-brand/10 text-brand-dark transition-all hover:bg-brand hover:text-white dark:text-brand dark:hover:text-white cursor-pointer"
          >
            <ChevronUp size={15} strokeWidth={2.25} />
          </button>
          <Link
            href="/contact"
            className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-brand-dark sm:text-[11px]"
          >
            Hire me
          </Link>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            aria-label="Built with Next.js"
            className="shrink-0 opacity-90 transition-opacity hover:opacity-100"
          >
            <img
              src="/nextjs-logo.png"
              alt="Next.js"
              className="h-4 w-auto object-contain sm:h-[18px]"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
