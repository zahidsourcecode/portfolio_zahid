'use client';

export default function Contact() {
  return (
    <main className="page-gradient relative min-w-0 overflow-x-hidden px-3 pb-6 pt-16 sm:px-6 sm:pb-8 sm:pt-20">
      <div className="mx-auto w-full max-w-3xl min-w-0">
        <iframe
          src="https://contact-form-iota-opal.vercel.app/"
          className="h-[calc(100dvh-11rem-env(safe-area-inset-bottom,0px))] w-full min-h-[280px] max-h-[820px] rounded-xl border border-gray-200 shadow-sm dark:border-slate-600 sm:h-[calc(100dvh-9.5rem-env(safe-area-inset-bottom,0px))] sm:min-h-[380px]"
          title="Contact form"
        ></iframe>
      </div>
    </main>
  );
}
