"use client";

import { useEffect } from "react";
import {
  AUTO_SCROLL_START_DELAY_MS,
  consumeAutoScrollFromMenu,
  runPageAutoScroll,
} from "../utils/pageAutoScroll";

export default function PageAutoScroll() {
  useEffect(() => {
    const startAfterFirstSection = consumeAutoScrollFromMenu();

    let stopScroll = () => {};
    const timeoutId = window.setTimeout(() => {
      stopScroll = runPageAutoScroll({ startAfterFirstSection });
    }, AUTO_SCROLL_START_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
      stopScroll();
    };
  }, []);

  return null;
}
