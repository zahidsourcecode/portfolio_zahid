"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Settings, Sun, Moon, Upload } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import UploadCvModal from "./UploadCvModal";
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
];

export default function Navbar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
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
    if (pathname !== href) markAutoScrollFromMenu();
    handleAutoScrollLinkClick(pathname, href);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300">
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border-b border-brand/20 dark:border-brand/15 shadow-[0_4px_24px_-4px_rgba(94,190,213,0.25)]" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 min-w-0 group shrink-0 cursor-pointer">
            <img
              src="/logo.png"
              alt="Zahid Hasan"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.28] group-active:scale-[1.12]"
            />
            <div className="flex flex-col leading-tight min-w-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105">
              <span className="text-base sm:text-lg font-bold truncate">
                <span className="text-slate-800 transition-colors duration-300 group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                  Zahid{" "}
                </span>
                <span className="text-brand-dark transition-colors duration-300 group-hover:text-brand-darker dark:text-brand dark:group-hover:text-brand-muted">
                  Hasan
                </span>
              </span>
              <span className="hidden sm:block text-xs font-medium text-slate-500 transition-colors duration-300 group-hover:text-brand-dark dark:text-brand/80 dark:group-hover:text-brand truncate">
                Technical Team Lead
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 bg-brand-light/50 dark:bg-slate-800/60 rounded-full px-1.5 py-1 border border-brand/15 dark:border-brand/10">
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

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                aria-label="Settings"
                className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
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
                <div className="absolute right-0 top-12 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-brand/20 dark:border-brand/15 rounded-2xl shadow-xl shadow-brand/10 py-3 z-50 overflow-hidden">
                  <div className="px-4 pb-2 border-b border-brand/15 dark:border-brand/10">
                    <p className="text-xs font-semibold text-brand-dark dark:text-brand uppercase tracking-widest">
                      Settings
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
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Theme</p>
                          <p className="text-xs text-slate-400">{isDark ? "Dark mode" : "Light mode"}</p>
                        </div>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
                          isDark ? "bg-brand" : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                            isDark ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
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
                      className="w-full flex items-center gap-2 py-2 text-sm text-slate-700 dark:text-slate-200 hover:text-brand-dark dark:hover:text-brand transition-colors cursor-pointer"
                    >
                      <Upload size={14} className="text-brand" />
                      Upload CV
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className={`md:hidden p-2 rounded-full transition-all duration-200 ${
                isOpen
                  ? "bg-brand text-white"
                  : "text-slate-700 dark:text-slate-200 hover:bg-brand-light dark:hover:bg-brand/15 hover:text-brand-dark"
              }`}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
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
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
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
