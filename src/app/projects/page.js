import { Suspense } from "react";
import ProjectsContent from "./ProjectsContent";
import PageLoadingState from "../components/PageLoadingState";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <main className="page-gradient min-w-0 overflow-x-hidden px-3 py-6 pb-10 pt-16 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-5xl min-w-0">
            <PageLoadingState icon="folderKanban" message="Loading projects data…" />
          </div>
        </main>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
