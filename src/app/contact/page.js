'use client';

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 px-3 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl transition-all duration-500 mt-20 mb-4">
        <iframe
          src="https://contact-form-iota-opal.vercel.app/"
          className="w-full h-[calc(100vh-7rem)] sm:h-[calc(100vh-6rem)] min-h-[480px] rounded-xl border border-gray-200 shadow-sm"
          title="Contact form"
        ></iframe>
      </div>
    </main>
  );
}
