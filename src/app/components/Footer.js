"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/skills", label: "Skills" },
  { href: "/contact-info", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/zahidsourcecode", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/zahidcseedu", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:zahidcseedu@yahoo.com", label: "Email", icon: Mail },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <footer className="relative border-t border-brand/20 bg-gradient-to-r from-brand-light/40 via-white to-brand-light/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 py-2.5 text-xs">
        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Zahid Hasan"
            className="h-7 w-7 object-contain transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 sm:h-8 sm:w-8"
          />
          <span className="origin-left leading-tight transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105">
            <span className="block font-[family-name:var(--font-playfair)] text-sm font-semibold">
              <span className="text-slate-800 transition-colors duration-300 group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                Zahid{" "}
              </span>
              <span className="text-brand-dark transition-colors duration-300 group-hover:text-brand-darker dark:text-brand dark:group-hover:text-brand-muted">
                Hasan
              </span>
            </span>
            <span className="hidden text-[10px] font-medium text-slate-500 transition-colors duration-300 group-hover:text-brand-dark dark:text-brand/80 dark:group-hover:text-brand sm:block">
              Technical Team Lead
            </span>
          </span>
        </Link>

        <span
          aria-hidden
          className="hidden h-3 w-px shrink-0 bg-brand/25 sm:inline-block"
        />

        {/* Nav */}
        <nav className="flex flex-wrap items-center justify-center gap-0.5 rounded-full border border-brand/20 bg-white/70 px-1 py-0.5 shadow-sm shadow-brand/5 backdrop-blur-sm dark:bg-slate-800/60">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-2 py-0.5 font-medium transition-all duration-200 ${
                isActive(href)
                  ? "bg-brand/20 text-brand-dark dark:text-brand"
                  : "text-slate-600 hover:bg-brand/10 hover:text-brand-dark dark:text-slate-300 dark:hover:text-brand"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <span
          aria-hidden
          className="hidden h-3 w-px shrink-0 bg-brand/25 lg:inline-block"
        />

        {/* Social + contact */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="flex items-center gap-0.5 rounded-full border border-brand/15 bg-white/70 px-0.5 py-0.5 dark:bg-slate-800/60">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-brand/15 hover:text-brand-dark dark:text-slate-400 dark:hover:text-brand"
              >
                <Icon size={13} strokeWidth={2.1} />
              </a>
            ))}
          </div>
          <Link
            href="/contact"
            className="hidden rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark sm:inline-block"
          >
            Hire me
          </Link>
        </div>

        <span
          aria-hidden
          className="hidden h-3 w-px shrink-0 bg-brand/25 xl:inline-block"
        />

        {/* Meta */}
        <div className="flex shrink-0 items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
          <span>
            © {year}{" "}
            <span className="font-medium text-slate-600 dark:text-slate-300">
              Zahid Hasan
            </span>
          </span>
          <span
            aria-hidden
            className="hidden h-3 w-px bg-brand/20 sm:inline-block"
          />
          <span className="hidden items-center gap-1 text-brand-dark dark:text-brand sm:inline-flex">
            <Heart size={9} className="fill-brand text-brand" />
            Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}
