"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { GridIcon, ListIcon } from "./ViewToggleIcons";

const navBtnClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600 dark:disabled:hover:text-slate-300 transition-colors";

export default function ContentToolbar({
  statusText,
  totalPages,
  currentPage,
  goToPage,
  labels,
  view,
  setView,
  viewBtnClass,
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <p className="min-w-0 text-xs text-slate-500 dark:text-slate-400 sm:text-sm md:flex-1">
        {statusText}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end md:shrink-0">
        {totalPages > 1 && (
          <nav
            aria-label={labels.paginationAriaLabel}
            className="flex items-center gap-1 sm:gap-1.5"
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
              className="inline-flex min-h-11 min-w-[3.25rem] items-center justify-center rounded-lg border border-brand/20 bg-white/90 px-2 text-xs font-semibold text-slate-600 dark:border-brand/15 dark:bg-slate-800/90 dark:text-slate-300 md:hidden"
              aria-current="page"
            >
              {currentPage}/{totalPages}
            </span>

            <div className="hidden items-center gap-1 md:flex">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  aria-label={`${labels.pageAriaLabel} ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                    page === currentPage
                      ? "bg-brand text-white shadow-md shadow-brand/25"
                      : "border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand-light/60 dark:hover:bg-brand/10 hover:text-brand-dark dark:hover:text-brand"
                  }`}
                >
                  {page}
                </button>
              ))}
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

        <div className="flex gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={viewBtnClass("grid")}
            aria-label={labels.grid}
          >
            <GridIcon />
            <span className="hidden sm:inline">{labels.grid}</span>
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={viewBtnClass("list")}
            aria-label={labels.list}
          >
            <ListIcon />
            <span className="hidden sm:inline">{labels.list}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
