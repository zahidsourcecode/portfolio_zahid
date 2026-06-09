import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "../../data/projects";

export default function ProjectDetails({ params }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) return notFound();

  return (
    <main className="page-gradient mx-auto flex w-full min-w-0 max-w-7xl flex-col items-stretch overflow-x-hidden px-3 pb-6 pt-16 sm:px-6 sm:pt-20">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <Link
          href="/projects"
          className="w-fit shrink-0 rounded-lg bg-brand px-4 py-2 text-sm text-white transition hover:bg-brand-dark sm:text-base"
        >
          ← Back to Projects
        </Link>
        <h1 className="min-w-0 break-words text-lg font-bold text-indigo-800 dark:text-brand sm:text-right sm:text-2xl lg:text-3xl">
          {project.title}
        </h1>
      </div>
      <div className="flex min-h-[240px] h-[calc(100dvh-14rem-env(safe-area-inset-bottom,0px))] w-full flex-1 overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:min-h-[320px] sm:h-[calc(100dvh-12rem-env(safe-area-inset-bottom,0px))]">
        <iframe
          src={project.iframeSrc}
          className="w-full h-full"
          title={project.title}
          style={{ backgroundColor: "transparent" }}
        />
      </div>
    </main>
  );
}
