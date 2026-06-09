"use client";

import styles from "./experienceShared.module.css";

export function MapPreview({ show, title, src, popupHandlers, onClose }) {
  if (!show) return null;

  return (
    <>
      <button
        type="button"
        className={styles.mapBackdrop}
        onClick={onClose}
        aria-label="Close map preview"
      />
      <span className={styles.mapPopup} {...popupHandlers}>
        <iframe title={title} frameBorder="0" src={src} allowFullScreen="" tabIndex="0" />
      </span>
    </>
  );
}
