const MENU_SCROLL_KEY = "portfolio:auto-scroll-after-section";
export const AUTO_SCROLL_START_DELAY_MS = 2000;

export const AUTO_SCROLL_PATHS = ["/skills", "/experience"];

export function markAutoScrollFromMenu() {
  try {
    sessionStorage.setItem(MENU_SCROLL_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function consumeAutoScrollFromMenu() {
  try {
    const fromMenu = sessionStorage.getItem(MENU_SCROLL_KEY) === "1";
    if (fromMenu) sessionStorage.removeItem(MENU_SCROLL_KEY);
    return fromMenu;
  } catch {
    return false;
  }
}

export function schedulePageAutoScroll(options = {}) {
  return window.setTimeout(() => {
    runPageAutoScroll(options);
  }, AUTO_SCROLL_START_DELAY_MS);
}

export function handleAutoScrollLinkClick(pathname, href) {
  markAutoScrollFromMenu();
  if (pathname === href) {
    schedulePageAutoScroll({ startAfterFirstSection: true });
  }
}

function getScrollStartY(startAfterFirstSection) {
  if (!startAfterFirstSection) return 0;

  const firstSection = document.querySelector("[data-page-section]");
  if (!firstSection) return 0;

  return Math.min(
    firstSection.getBoundingClientRect().bottom + window.scrollY,
    document.documentElement.scrollHeight
  );
}

export function runPageAutoScroll({ startAfterFirstSection = false } = {}) {
  if (typeof window === "undefined") return () => {};

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  if (window.matchMedia("(pointer: coarse)").matches) {
    return () => {};
  }

  const startY = getScrollStartY(startAfterFirstSection);
  window.scrollTo({ top: startY, behavior: "auto" });

  let rafId = 0;
  let stopped = false;

  const getMaxScroll = () =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  const stop = () => {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(rafId);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchstart", onUserInput, { capture: true });
    window.removeEventListener("wheel", onUserInput, { passive: true });
    document.body.classList.remove("page-auto-scroll");
  };

  const onMouseMove = () => stop();
  const onUserInput = () => stop();

  const pixelsPerSecond = 95;
  const maxScroll = getMaxScroll();
  const scrollDistance = Math.max(0, maxScroll - startY);
  const startTime = performance.now();
  const duration = Math.max(3500, (scrollDistance / pixelsPerSecond) * 1000);

  if (scrollDistance <= 0) {
    return stop;
  }

  document.body.classList.add("page-auto-scroll");

  const tick = (now) => {
    if (stopped) return;

    const currentMax = getMaxScroll();
    const distance = Math.max(0, currentMax - startY);
    if (distance <= 0) {
      stop();
      return;
    }

    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + progress * distance);

    if (progress < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      stop();
    }
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("touchstart", onUserInput, { passive: true, capture: true });
  window.addEventListener("wheel", onUserInput, { passive: true });
  rafId = requestAnimationFrame(tick);

  return stop;
}
