"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Settings, Sun, Moon, Upload } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import UploadCvModal from "./UploadCvModal";
import { useNavigation } from "../hooks/useNavigation";
import {
  AUTO_SCROLL_PATHS,
  handleAutoScrollLinkClick,
} from "../utils/pageAutoScroll";

export default function Navbar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const { navigationData, loading, error } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUploadCv, setShowUploadCv] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href) =>
    `relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive(href)
        ? "text-white bg-brand shadow-md shadow-brand/30"
        : "text-slate-600 dark:text-slate-300 hover:text-brand-dark dark:hover:text-brand hover:bg-brand-light/60 dark:hover:bg-brand/10"
    }`;

  const onNavClick = (href) => {
    if (!AUTO_SCROLL_PATHS.includes(href)) return;
    handleAutoScrollLinkClick(pathname, href);
  };

  if (loading && !navigationData) {
    return (
      <nav
        className="w-full fixed top-0 left-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300"
        aria-busy="true"
        aria-label="Loading navigation"
      >
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border-b border-brand/20 dark:border-brand/15 shadow-[0_4px_24px_-4px_rgba(94,190,213,0.25)]" />
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="h-9 w-36 animate-pulse rounded-xl bg-slate-200/90 dark:bg-slate-700/80" />
            <div className="hidden items-center gap-2 lg:flex">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="h-8 w-16 animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-700/70"
                />
              ))}
            </div>
            <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200/90 dark:bg-slate-700/80 lg:hidden" />
          </div>
        </div>
      </nav>
    );
  }

  if (error || !navigationData) {
    return (
      <nav className="w-full fixed top-0 left-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300">
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border-b border-brand/20 dark:border-brand/15 shadow-[0_4px_24px_-4px_rgba(94,190,213,0.25)]" />
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-center gap-3">
            <p className="text-sm text-slate-500 dark:text-slate-400" role="alert">
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
        </div>
      </nav>
    );
  }

  const { brand, navbar } = navigationData;
  const { navLinks, settings, mobileMenu, hireMe } = navbar;

  return (
    <nav className="w-full fixed top-0 left-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300">
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border-b border-brand/20 dark:border-brand/15 shadow-[0_4px_24px_-4px_rgba(94,190,213,0.25)]" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-3">
          <Link href={brand.homeHref} className="flex min-w-0 max-w-[55%] items-center gap-2.5 group cursor-pointer sm:max-w-none">
            <img
              src={brand.logo}
              alt={brand.logoAlt}
              className="h-10 w-10 shrink-0 sm:h-12 sm:w-12 object-contain transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.28] group-active:scale-[1.12]"
            />
            <div className="flex min-w-0 flex-col leading-tight origin-left transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105">
              <span className="text-base sm:text-lg font-bold truncate">
                <span className="text-slate-800 transition-colors duration-300 group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                  {brand.firstName}{" "}
                </span>
                <span className="text-brand-dark transition-colors duration-300 group-hover:text-brand-darker dark:text-brand dark:group-hover:text-brand-muted">
                  {brand.lastName}
                </span>
              </span>
              <span className="hidden sm:block text-xs font-medium text-slate-500 transition-colors duration-300 group-hover:text-brand-dark dark:text-brand/80 dark:group-hover:text-brand truncate">
                {brand.title}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1 bg-brand-light/50 dark:bg-slate-800/60 rounded-full px-1.5 py-1 border border-brand/15 dark:border-brand/10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(href)}
                onClick={() => onNavClick(href)}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href={hireMe.href}
              className="inline-flex min-h-11 items-center rounded-full bg-brand px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark sm:px-3.5 sm:text-sm"
            >
              {hireMe.label}
            </Link>

            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                aria-label={settings.ariaLabel}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                  showSettings
                    ? "bg-brand text-white shadow-md shadow-brand/30"
                    : "text-slate-500 dark:text-slate-400 hover:bg-brand-light dark:hover:bg-brand/15 hover:text-brand-dark dark:hover:text-brand"
                }`}
              >
                <Settings
                  size={20}
                  className={`transition-transform duration-300 ${showSettings ? "rotate-45" : ""}`}
                />
              </button>

              {showSettings && (
                <div className="absolute right-0 top-12 w-[min(16rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-brand/20 dark:border-brand/15 rounded-2xl shadow-xl shadow-brand/10 py-3 z-50 overflow-hidden">
                  <div className="px-4 pb-2 border-b border-brand/15 dark:border-brand/10">
                    <p className="text-xs font-semibold text-brand-dark dark:text-brand uppercase tracking-widest">
                      {settings.title}
                    </p>
                  </div>

                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {isDark ? (
                          <Moon size={16} className="text-brand" />
                        ) : (
                          <Sun size={16} className="text-amber-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            {settings.theme.label}
                          </p>
                          <p className="text-xs text-slate-400">
                            {isDark ? settings.theme.darkMode : settings.theme.lightMode}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={isDark ? settings.theme.lightMode : settings.theme.darkMode}
                        className="inline-flex h-11 w-14 shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 cursor-pointer"
                      >
                        <span
                          className={`relative block h-6 w-11 rounded-full transition-colors duration-300 ${
                            isDark ? "bg-brand" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                              isDark ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="px-4 border-t border-brand/15 dark:border-brand/10 pt-2 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettings(false);
                        setShowUploadCv(true);
                      }}
                      className="flex min-h-11 w-full items-center gap-2 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:text-brand-dark dark:hover:text-brand transition-colors cursor-pointer"
                    >
                      <Upload size={14} className="text-brand" />
                      {settings.uploadCv}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={mobileMenu.toggleAriaLabel}
              className={`lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all duration-200 ${
                isOpen
                  ? "bg-brand text-white"
                  : "text-slate-700 dark:text-slate-200 hover:bg-brand-light dark:hover:bg-brand/15 hover:text-brand-dark"
              }`}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? "max-h-[calc(100dvh-4.5rem)] opacity-100 pb-4 overflow-y-auto" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-brand/15 dark:border-brand/10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  onNavClick(href);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive(href)
                    ? "bg-brand text-white shadow-md shadow-brand/25"
                    : "text-slate-700 dark:text-slate-200 hover:bg-brand-light/70 dark:hover:bg-brand/10 hover:text-brand-dark dark:hover:text-brand"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <UploadCvModal open={showUploadCv} onClose={() => setShowUploadCv(false)} />
    </nav>
  );
}
