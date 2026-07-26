"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { useNavigation } from "../hooks/useNavigation";
import {
  AUTO_SCROLL_PATHS,
  handleAutoScrollLinkClick,
} from "../utils/pageAutoScroll";

export default function Footer() {
  const pathname = usePathname();
  const { navigationData, loading, error } = useNavigation();
  const year = new Date().getFullYear();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyrightClassName =
    "shrink-0 rounded-full border border-brand/25 bg-gradient-to-r from-brand/15 via-brand-light/60 to-brand/10 px-2.5 py-1 shadow-sm shadow-brand/10 dark:from-brand/10 dark:via-slate-800/80 dark:to-brand/5";

  if (loading && !navigationData) {
    return (
      <footer
        className="relative shrink-0 border-t border-brand/20 bg-gradient-to-r from-brand-light/30 via-white to-brand-light/20 backdrop-blur-md pb-[env(safe-area-inset-bottom,0px)] dark:border-brand/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950"
        aria-busy="true"
        aria-label="Loading footer"
      >
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3.5 sm:px-6">
          <div className="h-7 w-40 animate-pulse rounded-full bg-slate-200/90 dark:bg-slate-700/80" />
          <div className="hidden items-center gap-2 md:flex">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="h-6 w-14 animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-700/70"
              />
            ))}
          </div>
          <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200/90 dark:bg-slate-700/80" />
        </div>
      </footer>
    );
  }

  if (error || !navigationData) {
    return (
      <footer className="relative shrink-0 border-t border-brand/20 bg-gradient-to-r from-brand-light/30 via-white to-brand-light/20 backdrop-blur-md pb-[env(safe-area-inset-bottom,0px)] dark:border-brand/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-2 px-3 py-4 sm:px-6">
          <p className="text-xs text-slate-500 dark:text-slate-400" role="alert">
            {error || "Navigation data is unavailable."}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand/30 px-3.5 py-2 text-xs font-semibold text-brand-dark transition hover:bg-brand/10 dark:text-brand"
          >
            Try again
          </button>
        </div>
      </footer>
    );
  }

  const { footer } = navigationData;
  const { navLinks, copyright, nextJs } = footer;

  return (
    <footer className="relative shrink-0 border-t border-brand/20 bg-gradient-to-r from-brand-light/30 via-white to-brand-light/20 backdrop-blur-md pb-[env(safe-area-inset-bottom,0px)] dark:border-brand/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-4 md:py-2.5">
        <p
          className={`${copyrightClassName} flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-center text-xs leading-snug sm:justify-start sm:leading-none`}
        >
          <span className="font-semibold text-brand-dark dark:text-brand">© {year}</span>
          <span aria-hidden className="text-brand/35">
            ·
          </span>
          <span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              {copyright.firstName}{" "}
            </span>
            <span className="font-semibold text-brand-dark dark:text-brand">
              {copyright.lastName}
            </span>
          </span>
          <span aria-hidden className="text-brand/35">
            ·
          </span>
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {copyright.rightsText}
          </span>
        </p>

        <nav
          aria-label={footer.navAriaLabel}
          className="flex flex-wrap items-center justify-center gap-1 sm:gap-0.5 md:flex-1"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => {
                if (!AUTO_SCROLL_PATHS.includes(href)) return;
                handleAutoScrollLinkClick(pathname, href);
              }}
              className={`inline-flex min-h-11 items-center rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                isActive(href)
                  ? "bg-brand/15 text-brand-dark dark:text-brand"
                  : "text-slate-500 hover:text-brand-dark dark:text-slate-400 dark:hover:text-brand"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-center gap-2 sm:gap-2.5 md:ml-auto md:justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={footer.scrollToTopAriaLabel}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/25 bg-brand/10 text-brand-dark transition-all hover:bg-brand hover:text-white dark:text-brand dark:hover:text-white cursor-pointer"
          >
            <ChevronUp size={15} strokeWidth={2.25} />
          </button>
          <a
            href={nextJs.href}
            target="_blank"
            rel="noreferrer"
            aria-label={nextJs.ariaLabel}
            className="inline-flex h-11 min-w-[4.5rem] shrink-0 items-center justify-center opacity-90 transition-opacity hover:opacity-100"
          >
            <img
              src={nextJs.logoLight}
              alt={nextJs.alt}
              width={110}
              height={28}
              className="h-7 w-auto max-w-none object-contain dark:hidden"
            />
            <img
              src={nextJs.logoDark}
              alt={nextJs.alt}
              width={110}
              height={28}
              className="hidden h-7 w-auto max-w-none object-contain dark:block"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
