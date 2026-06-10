"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";

const inputClassName =
  "w-full rounded-xl border border-brand/25 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand/20 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";

const labelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400";

const CONTACT_TO_EMAIL = "zahidcseedu@yahoo.com";
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_TO_EMAIL)}`;

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(FORM_SUBMIT_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          subject,
          message,
          _subject: `Portfolio contact: ${subject}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Unexpected response from email service.");
      }

      if (!res.ok || data.success === "false") {
        const msg =
          typeof data.message === "string"
            ? data.message
            : "Something went wrong. Please try again.";
        throw new Error(msg);
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="grid shrink-0 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="contact-name" className={labelClassName}>
            Full name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={updateField("name")}
            placeholder="Your name"
            autoComplete="name"
            className={inputClassName}
            disabled={status === "sending"}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-email" className={labelClassName}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={updateField("email")}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClassName}
            disabled={status === "sending"}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className={labelClassName}>
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={form.subject}
            onChange={updateField("subject")}
            placeholder="What is this about?"
            className={inputClassName}
            disabled={status === "sending"}
          />
        </div>
      </div>

      <div className="mt-4 flex min-h-[140px] flex-1 flex-col">
        <label htmlFor="contact-message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={updateField("message")}
          placeholder="Write your message here..."
          className={`${inputClassName} min-h-[140px] flex-1 resize-none`}
          disabled={status === "sending"}
        />
      </div>

      <div className="mt-4 shrink-0">
        {status === "error" && errorMessage && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-300/80 bg-amber-50 px-3 py-2.5 text-sm font-medium text-amber-800 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-200">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            {errorMessage}
          </div>
        )}

        {status === "success" && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-brand/30 bg-brand-light/50 px-3 py-2.5 text-sm font-medium text-brand-dark dark:border-brand/25 dark:bg-brand/10 dark:text-brand">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
            Message sent successfully. I&apos;ll get back to you soon.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto cursor-pointer"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send message
              <Send size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
