"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import {
  AUTO_SCROLL_PATHS,
  handleAutoScrollLinkClick,
  markAutoScrollFromMenu,
} from "../utils/pageAutoScroll";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-info", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
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
    "shrink-0 rounded-full border border-brand/25 bg-gradient-to-r from-brand/15 via-brand-light/60 to-brand/10 px-2.5 py-1 shadow-sm shadow-brand/10 dark:from-brand/10 dark:via-slate-800/80 dark:to-brand/5";

  return (
    <footer className="relative shrink-0 border-t border-brand/20 bg-gradient-to-r from-brand-light/30 via-white to-brand-light/20 backdrop-blur-md pb-[env(safe-area-inset-bottom,0px)] dark:border-brand/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:py-2.5">
        <p
          className={`${copyrightClassName} flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-center text-[10px] leading-snug sm:justify-start sm:text-[11px] sm:leading-none`}
        >
          <span className="font-semibold text-brand-dark dark:text-brand">© {year}</span>
          <span aria-hidden className="text-brand/35">·</span>
          <span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">Zahid </span>
            <span className="font-semibold text-brand-dark dark:text-brand">Hasan</span>
          </span>
          <span aria-hidden className="text-brand/35">·</span>
          <span className="font-medium text-slate-600 dark:text-slate-300">All rights reserved.</span>
        </p>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-0.5 lg:flex-1"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => {
                if (!AUTO_SCROLL_PATHS.includes(href)) return;
                if (pathname !== href) markAutoScrollFromMenu();
                handleAutoScrollLinkClick(pathname, href);
              }}
              className={`inline-flex min-h-9 items-center rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors sm:text-xs ${
                isActive(href)
                  ? "bg-brand/15 text-brand-dark dark:text-brand"
                  : "text-slate-500 hover:text-brand-dark dark:text-slate-400 dark:hover:text-brand"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-center gap-2 sm:gap-2.5 lg:ml-auto lg:justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand/25 bg-brand/10 text-brand-dark transition-all hover:bg-brand hover:text-white dark:text-brand dark:hover:text-white cursor-pointer"
          >
            <ChevronUp size={15} strokeWidth={2.25} />
          </button>
          <Link
            href="/contact"
            className="inline-flex min-h-9 items-center rounded-full bg-brand px-3 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-brand-dark sm:text-[11px]"
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
              className="h-5 w-auto object-contain sm:h-[22px] dark:hidden"
            />
            <img
              src="/nextjs-logo-white.png"
              alt="Next.js"
              className="hidden h-5 w-auto object-contain sm:h-[22px] dark:block"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
