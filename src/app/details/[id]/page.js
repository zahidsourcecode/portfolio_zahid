import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import projectsData from "../../../data/projects.json";

const projects = projectsData.projects;

export default function ProjectDetails({ params }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) return notFound();

  return (
    <main className="page-gradient mx-auto flex w-full min-w-0 max-w-7xl flex-col items-stretch overflow-x-hidden px-3 pb-2 pt-16 sm:px-6 sm:pb-3 sm:pt-20">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <Link
          href="/projects"
          className="inline-flex w-fit shrink-0 items-center rounded-lg bg-brand px-4 py-2.5 text-sm text-white transition hover:bg-brand-dark min-h-11 sm:text-base"
        >
          ← Back to Projects
        </Link>
        <div className="flex min-w-0 flex-col gap-2 sm:items-end">
          <h1 className="min-w-0 break-words text-lg font-bold text-indigo-800 dark:text-brand sm:text-right sm:text-2xl lg:text-3xl">
            {project.title}
          </h1>
          {project.iframeSrc && (
            <a
              href={project.iframeSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-fit items-center gap-1.5 rounded-lg border border-brand/30 bg-white/90 px-3 py-2.5 text-xs font-semibold text-brand-dark transition hover:border-brand hover:bg-brand-light/50 dark:bg-slate-800/90 dark:text-brand sm:text-sm"
            >
              Open demo in new tab
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
      <div className="flex min-h-[220px] w-full flex-1 overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:min-h-[320px] h-[calc(100dvh-17rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px))] sm:h-[calc(100dvh-15rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px))]">
        <iframe
          src={project.iframeSrc}
          className="h-full w-full"
          title={project.title}
          style={{ backgroundColor: "transparent" }}
        />
      </div>
    </main>
  );
}
