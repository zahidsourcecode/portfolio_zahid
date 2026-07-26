"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { GridIcon, ListIcon } from "./ViewToggleIcons";

const navBtnClass =
  "inline-flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600 dark:disabled:hover:text-slate-300 transition-colors";

const pageBtnClass = (isActive) =>
  `inline-flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors ${
    isActive
      ? "bg-brand text-white shadow-md shadow-brand/25"
      : "border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand-light/60 dark:hover:bg-brand/10 hover:text-brand-dark dark:hover:text-brand"
  }`;

function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items = [1];
  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) {
    start = 2;
    end = 4;
  } else if (currentPage >= totalPages - 2) {
    start = totalPages - 3;
    end = totalPages - 1;
  }

  if (start > 2) items.push("ellipsis-start");
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < totalPages - 1) items.push("ellipsis-end");
  items.push(totalPages);

  return items;
}

export default function ContentToolbar({
  statusText,
  totalPages,
  currentPage,
  goToPage,
  labels,
  view,
  setView,
  viewBtnClass,
  leading = null,
  className = "mb-6",
}) {
  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <div
      className={`${className} ${
        leading
          ? "relative flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3"
          : "flex flex-col gap-3 md:flex-row md:items-center md:gap-4"
      }`}
    >
      {leading ? <div className="relative z-10 w-full min-w-0 sm:w-auto sm:shrink">{leading}</div> : null}

      {statusText ? (
        <p
          className={`min-w-0 text-xs font-bold text-slate-900 dark:text-white sm:text-sm ${
            leading
              ? "order-last w-full truncate text-center sm:order-none md:pointer-events-none md:absolute md:left-1/2 md:top-1/2 md:z-0 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2"
              : "md:flex-1"
          }`}
        >
          {statusText}
        </p>
      ) : null}

      <div
        className={`relative z-10 flex w-full flex-nowrap items-center justify-end gap-1.5 sm:ml-auto sm:w-auto sm:shrink-0 sm:gap-2 ${
          leading ? "" : "md:w-auto"
        }`}
      >
        {totalPages > 1 && (
          <nav
            aria-label={labels.paginationAriaLabel}
            className="flex flex-nowrap items-center gap-1"
          >
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label={labels.previousPageAriaLabel}
              className={navBtnClass}
            >
              <ChevronLeft size={18} />
            </button>

            <span
              className="inline-flex h-9 min-w-[3rem] items-center justify-center rounded-lg border border-brand/20 bg-white/90 px-2 text-xs font-semibold text-slate-600 dark:border-brand/15 dark:bg-slate-800/90 dark:text-slate-300 sm:h-11 sm:min-w-[3.25rem] md:hidden"
              aria-current="page"
            >
              {currentPage}/{totalPages}
            </span>

            <div className="hidden flex-nowrap items-center gap-1 md:flex">
              {paginationItems.map((item) =>
                typeof item === "string" ? (
                  <span
                    key={item}
                    className="inline-flex h-9 w-7 shrink-0 items-center justify-center text-sm font-semibold text-slate-400 sm:h-11 dark:text-slate-500"
                    aria-hidden
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => goToPage(item)}
                    aria-label={`${labels.pageAriaLabel} ${item}`}
                    aria-current={item === currentPage ? "page" : undefined}
                    className={pageBtnClass(item === currentPage)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label={labels.nextPageAriaLabel}
              className={navBtnClass}
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}

        <div className="flex flex-nowrap gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={viewBtnClass("grid")}
            aria-label={labels.grid}
          >
            <GridIcon />
            <span className="hidden lg:inline">{labels.grid}</span>
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={viewBtnClass("list")}
            aria-label={labels.list}
          >
            <ListIcon />
            <span className="hidden lg:inline">{labels.list}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
