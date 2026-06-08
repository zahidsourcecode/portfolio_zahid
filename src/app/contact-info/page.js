"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const contactItems = [
    {
        imgSrc: "/linkedin-icon.png",
        label: "LinkedIn",
        value: "linkedin.com/in/zahidcseedu",
        href: "https://linkedin.com/in/zahidcseedu",
    },
    {
        imgSrc: "/globe-icon.png",
        label: "Portfolio",
        value: "google.com",
        href: "https://google.com",
    },
    {
        imgSrc: "/book-icon.png",
        label: "Blog",
        value: "ixorasolution.com/author/zh",
        href: "/blog",
    },
    {
        imgSrc: "/call-icon.png",
        label: "Phone",
        value: "+8801704038252",
        href: "tel:+8801704038252",
    },
    {
        imgSrc: "/location-icon.png",
        label: "Address",
        value: "Block-A, Aftabnagar, Rampura, Dhaka, Bangladesh",
        href: "https://www.google.com/maps/place/BTI+Chorus/@23.768061,90.4201549,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c7005f87ef3f:0x601cd5d9a9d4ccd3!8m2!3d23.7680562!4d90.4250258!16s%2Fg%2F11ldxmv1cp?entry=ttu",
    },
    {
        imgSrc: "/mail-icon.png",
        label: "Email",
        value: "zahidcseedu@yahoo.com",
        href: "mailto:zahidcseedu@yahoo.com",
    },
];

export default function ContactInfo() {
    return (
        <main className="page-gradient flex min-w-0 flex-col items-center justify-center overflow-x-hidden px-3 py-16 pt-20 sm:px-4 sm:py-24 sm:pt-28">
            {/* Decorative blobs */}
            <div
                aria-hidden
                className="pointer-events-none fixed top-[-80px] right-[-80px] w-[200px] sm:w-[340px] h-[200px] sm:h-[340px] rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #3e0097, transparent)" }}
            />
            <div
                aria-hidden
                className="pointer-events-none fixed bottom-[-60px] left-[-60px] w-[160px] sm:w-[260px] h-[160px] sm:h-[260px] rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
            />

            {/* Card */}
            <div className="w-full max-w-lg bg-white/80 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/60 dark:border-slate-700">
                {/* Header banner */}
                <div
                    className="relative flex h-28 items-end px-4 pb-4 sm:px-7"
                    style={{
                        background:
                            "linear-gradient(135deg, #3e0097 0%, #6d28d9 60%, #818cf8 100%)",
                    }}
                >
                    {/* Subtle pattern */}
                    <svg
                        className="absolute inset-0 w-full h-full opacity-10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="dots"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                patternUnits="userSpaceOnUse"
                            >
                                <circle cx="2" cy="2" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>

                    <h1 className="relative text-white text-2xl font-bold tracking-tight drop-shadow">
                        Contact Info
                    </h1>
                </div>

                {/* Avatar bump */}
                <div className="relative px-4 pb-2 pt-0 sm:px-7">
                    <div className="absolute -top-10 right-7 w-20 h-20 rounded-full border-4 border-white dark:border-slate-700 shadow-lg overflow-hidden bg-indigo-100 dark:bg-slate-700">
                        <img
                            src="/logo.png"
                            alt="Zahid Hasan"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="pt-4 pb-2">
                        <p className="text-lg font-bold text-[#3e0097] dark:text-brand">Zahid Hasan</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Applicant</p>
                    </div>
                </div>

                <hr className="mx-4 border-gray-100 dark:border-slate-700 sm:mx-7" />

                {/* Contact rows */}
                <ul className="space-y-5 px-4 py-5 sm:px-7">
                    {contactItems.map(({ label, imgSrc, value, href }) => (
                        <li key={label} className="flex items-start gap-4 group">
                            <span className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 mt-0.5 bg-slate-100 dark:bg-slate-700 transition-transform group-hover:scale-110">
                                <img src={imgSrc} alt={label} className="w-7 h-7 object-contain" />
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
                                    {label}
                                </p>
                                <a
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel="noreferrer"
                                    className="text-sm font-medium text-gray-800 dark:text-slate-200 hover:text-[#3e0097] dark:hover:text-brand transition-colors break-words"
                                >
                                    {value}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>

                <hr className="mx-4 border-gray-100 dark:border-slate-700 sm:mx-7" />

                {/* CTA */}
                <div className="px-4 py-6 sm:px-7">
                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
                        Want to reach out directly? Send me a message and I&apos;ll get back to
                        you soon.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                        style={{
                            background:
                                "linear-gradient(135deg, #3e0097 0%, #6d28d9 100%)",
                        }}
                    >
                        Send me a message
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </main>
    );
}