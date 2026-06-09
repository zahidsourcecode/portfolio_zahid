import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Zahid Hasan",
  description: "Privacy policy for zahidhasan.dev portfolio website.",
};

export default function PrivacyPage() {
  return (
    <main className="page-gradient min-w-0 overflow-x-hidden px-3 pb-10 pt-16 sm:px-6 sm:pt-20">
      <article className="mx-auto max-w-3xl min-w-0 rounded-2xl border border-brand/20 bg-white/80 p-5 shadow-lg shadow-brand/10 backdrop-blur-md dark:bg-slate-900/80 sm:rounded-3xl sm:p-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">1. Who is responsible</h2>
            <p>
              This website is a personal portfolio operated by{" "}
              <strong>Zahid Hasan</strong>. For privacy questions, contact{" "}
              <a
                href="mailto:zahidcseedu@yahoo.com"
                className="font-medium text-brand-dark hover:text-brand dark:text-brand"
              >
                zahidcseedu@yahoo.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">2. What data this site collects</h2>
            <p>
              This portfolio is designed to collect <strong>minimal personal data</strong>:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Theme preference</strong> stored locally in your browser (localStorage) if you switch dark/light mode.
              </li>
              <li>
                <strong>Visit summary</strong> on the home page: your browser, operating system, and time zone are read locally in your browser. Your IP address and an approximate region (city/country) may be shown using a one-time server lookup for that section only.
              </li>
              <li>
                <strong>Contact messages</strong> only if you submit the separate contact form (hosted externally). That form has its own privacy terms.
              </li>
            </ul>
            <p className="mt-2">
              This site does <strong>not</strong> use analytics cookies or sell personal data.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">3. Legal basis (GDPR)</h2>
            <p>
              Where EU data protection law applies, processing is based on legitimate interest in operating a professional portfolio and, for contact requests, your consent when you submit a message.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">4. Your rights</h2>
            <p>
              If you are in the EU/EEA (including the Netherlands and Denmark), you may have the right to access, correct, delete, or restrict processing of your personal data, and to lodge a complaint with your local data protection authority.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">5. Third-party services</h2>
            <p>
              Some links open external services (LinkedIn, GitHub, Vimeo, Google Maps, Next.js, and the contact form provider). Those services may process data under their own policies when you visit them.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">6. Changes</h2>
            <p>
              This policy may be updated from time to time. Material changes will be reflected on this page with an updated date.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-brand/30 px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand/10 dark:text-brand"
        >
          ← Back to Home
        </Link>
      </article>
    </main>
  );
}
