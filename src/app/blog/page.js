import { Suspense } from "react";
import BlogContent from "./BlogContent";
import PageLoadingState from "../components/PageLoadingState";

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <main className="page-gradient flex min-h-screen min-w-0 items-center justify-center overflow-x-hidden px-3 py-6 pb-4 pt-16 sm:px-6 sm:pt-20">
          <PageLoadingState icon="bookOpen" message="Loading blog data…" />
        </main>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
