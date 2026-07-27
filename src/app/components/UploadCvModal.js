"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Upload, X } from "lucide-react";
import { CV_PIN } from "../lib/cvPin";

export default function UploadCvModal({ open, onClose }) {
  const [step, setStep] = useState("pin");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setStep("pin");
      setPin("");
      setPinError(false);
      setFile(null);
      setUploading(false);
      setUploadError("");
      setUploadSuccess(false);
    }
  }, [open]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === CV_PIN) {
      setPinError(false);
      setStep("upload");
    } else {
      setPinError(true);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadError("Please select a PDF file.");
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("pin", pin);
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error === "Wrong PIN" ? "Wrong PIN" : data.error || "Upload failed");
        if (data.error === "Wrong PIN") setPinError(true);
        return;
      }

      setUploadSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 backdrop-blur-sm p-3 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-t-2xl border border-brand/25 bg-white shadow-2xl shadow-brand/20 sm:rounded-2xl dark:border-brand/20 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-brand/20 bg-gradient-to-r from-brand/20 via-brand/10 to-transparent px-4 py-3 sm:px-5">
          <h2 className="text-base font-semibold text-brand-dark dark:text-brand">
            {step === "pin" ? "Enter PIN" : "Upload CV"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-brand/15 p-2 text-brand-dark transition hover:bg-brand hover:text-white dark:text-brand cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          {step === "pin" ? (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Enter your PIN to upload a new CV.
              </p>
              <input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter PIN"
                className="w-full rounded-xl border border-brand/25 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand/20 dark:bg-slate-800 dark:text-slate-100"
                autoFocus
              />
              {pinError && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-300/80 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-200">
                  <AlertTriangle size={16} className="shrink-0" />
                  Wrong PIN
                </div>
              )}
              <button
                type="submit"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark cursor-pointer"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleUpload} className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Select a PDF file to replace your current CV.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setUploadError("");
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-dashed border-brand/40 bg-brand/5 px-4 py-6 text-sm font-medium text-brand-dark transition hover:border-brand hover:bg-brand/10 dark:text-brand cursor-pointer"
              >
                <Upload size={18} className="shrink-0" />
                <span className="min-w-0 break-all text-left">
                  {file ? file.name : "Choose PDF file"}
                </span>
              </button>
              {uploadError && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-300/80 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-200">
                  <AlertTriangle size={16} className="shrink-0" />
                  {uploadError}
                </div>
              )}
              {uploadSuccess && (
                <p className="text-sm font-medium text-brand-dark dark:text-brand">
                  CV uploaded successfully!
                </p>
              )}
              <button
                type="submit"
                disabled={uploading || !file}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {uploading ? "Uploading..." : "Upload CV"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
