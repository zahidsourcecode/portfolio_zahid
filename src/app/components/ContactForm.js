"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";

const inputClassName =
  "w-full min-h-11 rounded-xl border border-brand/25 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand/20 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";

const labelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400";

export default function ContactForm({ form }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(form.toEmail)}`;

  const updateField = (field) => (e) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formState.name.trim();
    const email = formState.email.trim();
    const subject = formState.subject.trim();
    const message = formState.message.trim();

    if (!name || !email || !subject || !message) {
      setStatus("error");
      setErrorMessage(form.messages.requiredFields);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage(form.messages.invalidEmail);
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(formSubmitUrl, {
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
          _subject: `${form.emailSubjectPrefix}${subject}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        throw new Error(form.messages.unexpectedResponse);
      }

      if (!res.ok || data.success === "false") {
        const msg =
          typeof data.message === "string" ? data.message : form.messages.genericError;
        throw new Error(msg);
      }

      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || form.messages.sendFailed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="grid shrink-0 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="contact-name" className={labelClassName}>
            {form.labels.name}
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formState.name}
            onChange={updateField("name")}
            placeholder={form.placeholders.name}
            autoComplete="name"
            className={inputClassName}
            disabled={status === "sending"}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-email" className={labelClassName}>
            {form.labels.email}
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formState.email}
            onChange={updateField("email")}
            placeholder={form.placeholders.email}
            autoComplete="email"
            className={inputClassName}
            disabled={status === "sending"}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className={labelClassName}>
            {form.labels.subject}
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={formState.subject}
            onChange={updateField("subject")}
            placeholder={form.placeholders.subject}
            className={inputClassName}
            disabled={status === "sending"}
          />
        </div>
      </div>

      <div className="mt-4 flex min-h-[140px] flex-1 flex-col">
        <label htmlFor="contact-message" className={labelClassName}>
          {form.labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formState.message}
          onChange={updateField("message")}
          placeholder={form.placeholders.message}
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
            {form.messages.success}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto cursor-pointer"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {form.submit.sending}
            </>
          ) : (
            <>
              {form.submit.idle}
              <Send size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
