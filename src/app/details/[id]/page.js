import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "../../data/projects";

export default function ProjectDetails({ params }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) return notFound();

  return (
    <main className="page-gradient px-4 sm:px-6 pt-20 pb-4 flex flex-col items-stretch max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <Link
          href="/projects"
          className="w-fit px-4 py-2 rounded-lg bg-brand text-white text-sm sm:text-base hover:bg-brand-dark transition"
        >
          ← Back to Projects
        </Link>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-800 dark:text-brand">
          {project.title}
        </h1>
      </div>
      <div className="w-full flex-1 min-h-[50vh] h-[calc(100vh-10rem)] sm:h-[calc(100vh-9rem)] overflow-hidden rounded-xl border border-indigo-100 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800">
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
