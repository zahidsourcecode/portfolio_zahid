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

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <footer className="relative border-t border-brand/20 bg-gradient-to-r from-brand-light/40 via-white to-brand-light/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="flex items-center gap-2 group shrink-0 order-1">
          <img
            src="/logo.png"
            alt="Zahid Hasan"
            className="w-6 h-6 rounded-full object-cover ring-1 ring-brand/40"
          />
          <span className="group-hover:text-brand-dark dark:group-hover:text-brand transition-colors">
            © {new Date().getFullYear()} Zahid Hasan
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-1 px-1.5 py-0.5 rounded-full bg-white/60 dark:bg-slate-800/50 border border-brand/15 order-3 sm:order-2 w-full sm:w-auto">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-2 py-0.5 rounded-full font-medium transition-colors ${
                isActive(href)
                  ? "text-white bg-brand"
                  : "text-slate-600 dark:text-slate-300 hover:text-brand-dark dark:hover:text-brand"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0 order-2 sm:order-3">
          <div className="flex items-center gap-0.5">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:text-white hover:bg-brand transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-brand-dark dark:text-brand">
            <Heart size={10} className="fill-brand text-brand" />
            Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}
