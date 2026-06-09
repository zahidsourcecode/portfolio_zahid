"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  ArrowRight,
  Download,
  Globe,
  Clock,
  AppWindow,
  Laptop,
  Network,
} from "lucide-react";
import { allExperienceRoles } from "./data/experienceDates";
import { getCareerDurationParts } from "./utils/experienceDuration";

const VIMEO_VIDEO_ID = "1182190333";
const VIMEO_EMBED = `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&title=0&byline=0&portrait=0`;

function getBrowserName() {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Microsoft Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/")) return "Safari";
  return "Unknown";
}

function getOSName() {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Windows NT 10.0")) return "Windows 10/11";
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown";
}

function getTimezoneLabel() {
  if (typeof Intl === "undefined") return "Unknown";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMinutes = -new Date().getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const hours = Math.floor(Math.abs(offsetMinutes) / 60);
    const mins = Math.abs(offsetMinutes) % 60;
    const utc = mins
      ? `UTC${sign}${hours}:${String(mins).padStart(2, "0")}`
      : `UTC${sign}${hours}`;
    const city = tz.split("/").pop()?.replace(/_/g, " ") || tz;
    return `${city} · ${utc}`;
  } catch {
    return "Unknown";
  }
}

const visitSummaryCards = [
  { key: "timezone", label: "Time Zone", icon: Clock },
  { key: "region", label: "Region", icon: MapPin },
  { key: "ip", label: "IP Address", icon: Network, mono: true },
  { key: "browser", label: "Browser", icon: AppWindow },
  { key: "os", label: "OS", icon: Laptop },
];

const socialLinks = [
  {
    href: "https://linkedin.com/in/zahidcseedu",
    label: "LinkedIn",
    icon: "/linkedin-icon.png",
  },
  {
    href: "https://github.com/zahidsourcecode",
    label: "GitHub",
    icon: "/github-icon.png",
  },
  {
    href: "https://leetcode.com/u/zahidcseedu/",
    label: "LeetCode",
    icon: "/leetcode-icon.png",
  },
  {
    href: "https://www.google.com/maps/place/BTI+Chorus/@23.768061,90.4201549,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c7005f87ef3f:0x601cd5d9a9d4ccd3!8m2!3d23.7680562!4d90.4250258!16s%2Fg%2F11ldxmv1cp?entry=ttu",
    label: "Map",
    icon: "/map-icon.png",
  },
];

const cvLink = {
  href: "/CV.pdf",
  label: "CV",
  icon: "/cv-icon.png",
};

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
  const [showCv, setShowCv] = useState(false);
  const [experienceLabel, setExperienceLabel] = useState("9+ years");
  const [visitSummary, setVisitSummary] = useState({
    timezone: "Detecting…",
    region: "Detecting…",
    ip: "Detecting…",
    browser: "Detecting…",
    os: "Detecting…",
  });

  useEffect(() => {
    const { years, months } = getCareerDurationParts(allExperienceRoles);
    if (years > 0) {
      setExperienceLabel(months > 0 ? `${years}+ years` : `${years} years`);
    }
  }, []);

  useEffect(() => {
    setVisitSummary((prev) => ({
      ...prev,
      browser: getBrowserName(),
      os: getOSName(),
      timezone: getTimezoneLabel(),
    }));

    fetch("/api/visitor-info")
      .then((res) => res.json())
      .then((data) => {
        setVisitSummary((prev) => ({
          ...prev,
          region: data.location || "Unknown",
          ip: data.ip || "Unknown",
        }));
      })
      .catch(() => {
        setVisitSummary((prev) => ({
          ...prev,
          region: "Unavailable",
          ip: "Unavailable",
        }));
      });
  }, []);

  return (
    <main className="page-gradient pt-16 sm:pt-20 pb-8 sm:pb-12 relative overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 sm:w-72 sm:h-72 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #5ebed5 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 -left-16 w-40 h-40 sm:w-64 sm:h-64 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #5ebed5 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-3 sm:px-6">
        <div className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl shadow-brand/10 border border-brand/20 dark:border-brand/15 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Photo panel */}
            <div className="lg:w-[42%] bg-gradient-to-br from-brand/25 via-brand-light/60 to-white dark:from-brand/20 dark:via-slate-800 dark:to-slate-900 p-5 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center">
              <div className="relative mb-3 sm:mb-4 w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] cursor-pointer mx-auto">
                <div
                  aria-hidden
                  className="absolute inset-0 scale-90 bg-brand/35 blur-2xl opacity-80"
                />
                <img
                  src="/profile-photo.png"
                  alt="Zahid Hasan"
                  className="relative w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(94,190,213,0.35)] hover:scale-[1.12] transition-transform duration-300 ease-out"
                />
              </div>

              <div className="mx-auto flex w-full max-w-[360px] flex-wrap items-center justify-center gap-1 px-0.5 sm:max-w-[400px] sm:flex-nowrap sm:gap-1.5">
                {socialLinks.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={
                      href.startsWith("http") || href.endsWith(".pdf")
                        ? "_blank"
                        : undefined
                    }
                    rel="noreferrer"
                    aria-label={label}
                    className="shrink-0 rounded-lg p-0.5 hover:bg-brand/15 hover:scale-110 transition-all duration-200 cursor-pointer sm:rounded-xl sm:p-1"
                  >
                    <img
                      src={icon}
                      alt={label}
                      className={`object-contain ${
                        label === "GitHub" || label === "LeetCode"
                          ? "h-6 w-6 sm:h-7 sm:w-7"
                          : "h-7 w-7 sm:h-9 sm:w-9"
                      }`}
                    />
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  aria-label="Play intro video"
                  className="shrink-0 rounded-lg p-0.5 hover:bg-brand/15 hover:scale-110 transition-all duration-200 cursor-pointer sm:rounded-xl sm:p-1"
                >
                  <img
                    src="/youtube-icon.png"
                    alt="Play video"
                    className="h-[22px] w-[28px] object-contain sm:h-[26px] sm:w-[34px]"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setShowCv(true)}
                  aria-label={cvLink.label}
                  className="shrink-0 rounded-lg p-0.5 hover:bg-brand/15 hover:scale-110 transition-all duration-200 cursor-pointer sm:rounded-xl sm:p-1"
                >
                  <img
                    src={cvLink.icon}
                    alt={cvLink.label}
                    className="h-6 w-6 object-contain sm:h-7 sm:w-7"
                  />
                </button>
              </div>
            </div>

            {/* Content panel */}
            <div className="lg:w-[58%] p-5 sm:p-8 lg:p-10 flex flex-col justify-center min-w-0">
              <div className="mb-4 sm:mb-6 rounded-r-xl border-l-[3px] border-brand bg-gradient-to-r from-brand/[0.08] via-brand/[0.03] to-transparent py-3 sm:py-4 pl-3 sm:pl-5 pr-2">
                <div className="group origin-left cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.04]">
                  <h1 className="font-[family-name:var(--font-playfair)] text-[1.75rem] sm:text-[2.1rem] lg:text-[2.65rem] font-semibold leading-tight">
                    <span className="text-slate-900 transition-colors duration-300 group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                      Zahid{" "}
                    </span>
                    <span className="text-brand transition-colors duration-300 group-hover:text-brand-dark dark:text-brand dark:group-hover:text-brand-muted">
                      Hasan
                    </span>
                  </h1>
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base font-medium tracking-wide text-slate-600 dark:text-slate-300">
                    Technical Team Lead
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 space-y-1.5">
                  <a
                    href="https://ixorasolution.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-fit max-w-full text-sm sm:text-[15px] font-semibold text-slate-800 dark:text-slate-100 cursor-pointer hover:text-brand-dark dark:hover:text-brand transition-colors"
                  >
                    iXora Solution Ltd.
                  </a>
                  <a
                    href="https://www.google.com/maps?sca_esv=92bb7c0feee8c152&output=search&q=ixora+solution+ltd&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpaEWjvZ2Py1XXV8d8KvlI3hg2cLua8k0b5ikl_6e-_EuFsRepks8dSDV0mJOe83aH0OYOSls-EzJRP8WlNq9aowBRY3HUMDUtp90-eVxbtg3_2AnurBz6HRXwTAqWfD_uzOpKxfF5ktNmQ9WUH0R514Bz-VtTSqQGgluOvtuFeiQEG9KLPI4RICQ-t-xX850A5SPhJA&entry=mc&ved=1t:200715&ictx=111"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start sm:items-center gap-2 w-fit max-w-full text-xs sm:text-sm text-slate-500 dark:text-slate-400 cursor-pointer hover:text-brand-dark dark:hover:text-brand transition-colors text-left"
                  >
                    <MapPin size={14} strokeWidth={2.25} className="text-brand shrink-0 mt-0.5 sm:mt-0" />
                    <span>Mirpur-14, Dhaka-1206</span>
                  </a>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-5 sm:mb-6 text-left sm:text-justify">
                Technical Team Lead with expertise in AI-assisted software development
                using <span className="font-semibold text-slate-900 dark:text-white">Claude</span>,{" "}
                <span className="font-semibold text-slate-900 dark:text-white">Cursor</span>, and
                ChatGPT. Over{" "}
                <span className="font-semibold text-slate-900 dark:text-white">{experienceLabel}</span> of
                experience building{" "}
                <span className="font-semibold text-slate-900 dark:text-white">ERP</span>, Accounting,
                POS, and E-commerce solutions. Skilled in Angular, React.js, Next.js,
                Express.js, <span className="font-semibold text-slate-900 dark:text-white">.NET</span>, Azure, PostgreSQL,{" "}
                <span className="font-semibold text-slate-900 dark:text-white">MS SQL</span>, and
                RESTful APIs. Strong background in Agile, OOP, and software design
                patterns. Microsoft 365 Fundamentals (MS-900) Certified.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 mb-5 sm:mb-7">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold shadow-md shadow-brand/30 hover:shadow-brand/50 transition-all"
                >
                  Work with me
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full border border-brand/30 text-brand-dark dark:text-brand text-sm font-semibold hover:bg-brand/10 transition-all"
                >
                  View projects
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Your visit summary */}
        <section className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl border border-brand/20 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-xl shadow-brand/10 overflow-hidden">
          <div className="flex items-center justify-center gap-2 sm:gap-3 border-b border-brand/15 bg-gradient-to-r from-brand/15 via-brand/5 to-brand/15 px-4 py-3 sm:px-6 sm:py-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white shadow-md shadow-brand/30">
              <Globe className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <div className="text-center">
              <h2 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100">
                Your visit summary
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 p-3 sm:p-5">
            {visitSummaryCards.map(({ key, label, icon: Icon, mono }) => {
              const isLoading = visitSummary[key] === "Detecting…";

              return (
                <div
                  key={key}
                  className="group relative flex flex-col items-center gap-2 sm:gap-2.5 overflow-hidden rounded-xl sm:rounded-2xl border border-brand/20 bg-gradient-to-br from-white via-brand-light/40 to-brand/10 p-3.5 sm:p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/45 hover:shadow-lg hover:shadow-brand/20 dark:from-slate-900 dark:via-slate-800/90 dark:to-brand/10"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-muted to-brand opacity-80"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand/10 blur-2xl transition-opacity duration-300 group-hover:bg-brand/20"
                  />

                  <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-md shadow-brand/35 ring-4 ring-brand/10 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2.1} />
                  </span>

                  <span className="font-semibold uppercase text-[10px] sm:text-[11px] tracking-[0.14em] text-brand-dark/75 dark:text-brand/80">
                    {label}
                  </span>

                  <span
                    className={`relative max-w-full break-words text-xs sm:text-sm font-bold leading-snug text-slate-800 dark:text-white ${
                      mono ? "font-mono tracking-tight" : ""
                    } ${isLoading ? "animate-pulse text-brand-dark/70 dark:text-brand/70" : ""}`}
                  >
                    {visitSummary[key]}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="border-t border-brand/10 px-4 py-3 text-center text-[11px] text-slate-500 dark:text-slate-400 sm:px-6 sm:text-xs">
            Browser and OS are read locally. IP and region are approximate.{" "}
            <Link href="/privacy" className="font-medium text-brand-dark hover:text-brand dark:text-brand">
              Privacy policy
            </Link>
          </p>
        </section>
      </div>

      {/* Video modal */}
      <div
        className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ${
          showVideo ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowVideo(false)}
      >
        <div
          className="relative flex w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[90vh] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-brand/25 bg-white shadow-2xl shadow-brand/20 dark:border-brand/20 dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-2 border-b border-brand/20 bg-gradient-to-r from-brand/20 via-brand/10 to-transparent px-3 py-2.5 sm:px-5 sm:py-3">
            <h2 className="text-sm sm:text-base font-semibold text-brand-dark dark:text-brand">
              Intro Video
            </h2>
            <button
              type="button"
              onClick={() => setShowVideo(false)}
              className="rounded-full bg-brand/15 p-1.5 text-brand-dark transition hover:bg-brand hover:text-white dark:text-brand cursor-pointer"
              aria-label="Close video"
            >
              <X size={18} />
            </button>
          </div>

          {showVideo && (
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={VIMEO_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                title="Intro video"
              />
            </div>
          )}
        </div>
      </div>

      {/* CV modal */}
      <div
        className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ${
          showCv ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowCv(false)}
      >
        <div
          className="relative flex w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[90vh] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-brand/25 bg-white shadow-2xl shadow-brand/20 dark:border-brand/20 dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand/20 bg-gradient-to-r from-brand/20 via-brand/10 to-transparent px-3 py-2.5 sm:px-5 sm:py-3">
            <h2 className="text-sm sm:text-base font-semibold text-brand-dark dark:text-brand">
              My CV
            </h2>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href={cvLink.href}
                download="Zahid_Hasan_CV.pdf"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-brand px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark hover:shadow-brand/50"
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                Download
              </a>
              <button
                type="button"
                onClick={() => setShowCv(false)}
                className="rounded-full bg-brand/15 p-1.5 text-brand-dark transition hover:bg-brand hover:text-white dark:text-brand cursor-pointer"
                aria-label="Close CV viewer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {showCv && (
            <iframe
              src={`${cvLink.href}#toolbar=1&navpanes=0`}
              className="h-[75vh] sm:h-[70vh] w-full border-0 bg-white"
              title="CV preview"
            />
          )}
        </div>
      </div>
    </main>
  );
}
