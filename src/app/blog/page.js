import { Suspense } from "react";
import BlogContent from "./BlogContent";
import PageLoadingState from "../components/PageLoadingState";

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <main className="page-gradient min-w-0 overflow-x-hidden px-3 py-6 pb-10 pt-16 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-5xl min-w-0">
            <PageLoadingState icon="bookOpen" message="Loading blog data…" />
          </div>
        </main>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
