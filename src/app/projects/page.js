import { Suspense } from "react";
import ProjectsContent from "./ProjectsContent";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <main className="page-gradient min-w-0 overflow-x-hidden px-3 py-6 pb-10 pt-16 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-5xl min-w-0 text-center text-slate-500 dark:text-slate-400">
            Loading projects...
          </div>
        </main>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
