"use client";

import { useCallback, useRef, useState } from "react";

export function useMapPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const hideTimeoutRef = useRef(null);

  const clearHide = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const show = useCallback(() => {
    clearHide();
    setShowPopup(true);
  }, [clearHide]);

  const hide = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => setShowPopup(false), 120);
  }, []);

  const close = useCallback(() => {
    clearHide();
    setShowPopup(false);
  }, [clearHide]);

  const toggleTouch = useCallback((event) => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    event.preventDefault();
    setShowPopup((open) => !open);
  }, []);

  return {
    showPopup,
    show,
    hide,
    close,
    toggleTouch,
    linkHandlers: {
      onMouseEnter: show,
      onMouseLeave: hide,
      onClick: toggleTouch,
    },
    popupHandlers: {
      onMouseEnter: show,
      onMouseLeave: hide,
    },
  };
}
