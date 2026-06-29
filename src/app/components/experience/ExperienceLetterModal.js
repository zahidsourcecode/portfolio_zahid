"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import styles from "./experienceShared.module.css";

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.15;

function toZoomValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default function ExperienceLetterModal({
  open,
  onClose,
  image,
  imageAlt,
  title,
  imageScale = 1,
}) {
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(() => toZoomValue(imageScale));
  const wasOpenRef = useRef(false);
  const initialScale = toZoomValue(imageScale);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setZoom(initialScale);
    }
    wasOpenRef.current = open;
  }, [open, initialScale]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const zoomIn = (event) => {
    event.stopPropagation();
    setZoom((current) => Math.min(MAX_ZOOM, Number((current + ZOOM_STEP).toFixed(2))));
  };

  const zoomOut = (event) => {
    event.stopPropagation();
    setZoom((current) => Math.max(MIN_ZOOM, Number((current - ZOOM_STEP).toFixed(2))));
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className={styles.letterModal}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={styles.letterModalDialog} onClick={(event) => event.stopPropagation()}>
        <div className={styles.letterModalHeader}>
          <h2 className={styles.letterModalTitle}>{title}</h2>
          <div className={styles.letterModalActions}>
            <button
              type="button"
              className={styles.letterZoomBtn}
              onClick={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
            >
              <ZoomOut size={16} strokeWidth={2.25} />
            </button>
            <span className={styles.letterZoomLabel}>{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className={styles.letterZoomBtn}
              onClick={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
            >
              <ZoomIn size={16} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              className={styles.letterModalClose}
              onClick={handleClose}
              aria-label="Close letter viewer"
            >
              <X size={18} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <div className={styles.letterModalBody}>
          <div
            className={styles.letterModalImageSizer}
            style={{ width: `${zoom * 100}%` }}
          >
            <img src={image} alt={imageAlt} className={styles.letterModalImage} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
