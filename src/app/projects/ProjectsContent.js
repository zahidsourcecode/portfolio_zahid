"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderKanban,
} from "lucide-react";
import { projects } from "../data/projects";
import { GridIcon, ListIcon } from "../components/ViewToggleIcons";

const PROJECTS_PER_PAGE = 4;

function ProjectImage({ project, variant = "grid" }) {
  if (variant === "grid") {
    return (
      <Link href={`/details/${project.id}`} className="block overflow-hidden">
        <img
          src={project.image}
          alt={project.role}
          className="w-full h-44 sm:h-48 object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>
    );
  }

  return (
    <Link
      href={`/details/${project.id}`}
      className="block shrink-0 overflow-hidden rounded-xl"
    >
      <img
        src={project.image}
        alt={project.role}
        className="w-full sm:w-44 md:w-52 h-40 sm:h-full sm:min-h-[160px] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </Link>
  );
}

function TagList({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-white/80 dark:bg-slate-800/80 rounded-full px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectTitle({ project }) {
  return (
    <h2 className="mb-2 leading-snug">
      <Link
        href={`/details/${project.id}`}
        className="inline-block font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 hover:text-brand-dark dark:hover:text-brand transition-all duration-200 hover:scale-105 origin-left"
      >
        {project.role}
      </Link>
    </h2>
  );
}

function DetailsButton({ id }) {
  return (
    <Link
      href={`/details/${id}`}
      className="inline-flex items-center gap-1.5 w-fit px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark shadow-sm shadow-brand/20 hover:shadow-brand/35 transition-colors group shrink-0"
    >
      View details
      <ArrowUpRight
        size={15}
        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
      />
    </Link>
  );
}

function LiveDemoButton({ demoUrl }) {
  if (!demoUrl) return null;

  return (
    <a
      href={demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 w-fit px-4 py-2 rounded-lg border border-brand/35 bg-white/90 text-sm font-semibold text-brand-dark shadow-sm transition-colors hover:border-brand hover:bg-brand-light/50 group shrink-0 dark:bg-slate-800/90 dark:text-brand dark:hover:bg-brand/10"
    >
      Live demo
      <ExternalLink
        size={15}
        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
      />
    </a>
  );
}

function ProjectActions({ id, demoUrl, stacked = false }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${
        stacked ? "w-full flex-col sm:w-auto sm:flex-row [&_a]:w-full sm:[&_a]:w-fit" : ""
      }`}
    >
      <DetailsButton id={id} />
      <LiveDemoButton demoUrl={demoUrl} />
    </div>
  );
}

export default function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState("grid");

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Number.isNaN(rawPage)
    ? 1
    : Math.min(Math.max(rawPage, 1), totalPages);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return projects.slice(start, start + PROJECTS_PER_PAGE);
  }, [currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    router.push(page === 1 ? "/projects" : `/projects?page=${page}`);
  };

  const viewBtnClass = (mode) =>
    `flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg text-sm font-medium border border-brand cursor-pointer transition ${
      view === mode
        ? "bg-brand text-white"
        : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200"
    }`;

  return (
        <main className="page-gradient min-w-0 overflow-x-hidden px-3 py-6 pb-10 pt-16 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-5xl min-w-0">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FolderKanban size={22} className="text-brand" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              Projects
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            A collection of web applications and demos built with React, Next.js, Node.js,
            MongoDB, and modern full-stack tools.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2 sm:gap-3">
          <p className="min-w-0 flex-1 truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            {totalPages > 1
              ? `Page ${currentPage} of ${totalPages} · ${projects.length} projects`
              : `${projects.length} projects`}
          </p>

          {totalPages > 1 && (
            <nav
              aria-label="Projects pagination"
              className="flex shrink-0 items-center justify-center gap-1 sm:gap-1.5"
            >
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="p-2 rounded-lg border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600 dark:disabled:hover:text-slate-300 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={`inline-flex min-w-[36px] h-9 items-center justify-center px-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                    page === currentPage
                      ? "bg-brand text-white shadow-md shadow-brand/25"
                      : "border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand-light/60 dark:hover:bg-brand/10 hover:text-brand-dark dark:hover:text-brand"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="p-2 rounded-lg border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600 dark:disabled:hover:text-slate-300 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </nav>
          )}

          <div className={`flex shrink-0 gap-1.5 sm:gap-2 ${totalPages > 1 ? "flex-1 justify-end" : ""}`}>
            <button onClick={() => setView("grid")} className={viewBtnClass("grid")}>
              <GridIcon />
              Grid
            </button>
            <button onClick={() => setView("list")} className={viewBtnClass("list")}>
              <ListIcon />
              List
            </button>
          </div>
        </div>

        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {paginatedProjects.map((project) => (
              <article
                key={project.id}
                className={`${project.bg} rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex flex-col hover:shadow-xl transition-shadow overflow-hidden`}
              >
                <ProjectImage project={project} variant="grid" />

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <TagList tags={project.tags} />
                  </div>

                  <ProjectTitle project={project} />

                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-5 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  <ProjectActions id={project.id} demoUrl={project.iframeSrc} />
                </div>
              </article>
            ))}
          </div>
        )}

        {view === "list" && (
          <div className="flex flex-col gap-4">
            {paginatedProjects.map((project) => (
              <article
                key={project.id}
                className={`${project.bg} rounded-2xl shadow border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col sm:flex-row sm:items-stretch gap-4`}
              >
                <ProjectImage project={project} variant="list" />

                <div className="flex-1 min-w-0 flex flex-col sm:justify-center">
                  <ProjectTitle project={project} />
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  <TagList tags={project.tags} />
                </div>

                <div className="w-full shrink-0 self-stretch sm:w-auto sm:self-center">
                  <ProjectActions id={project.id} demoUrl={project.iframeSrc} stacked />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
