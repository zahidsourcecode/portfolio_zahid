import { Suspense } from "react";
import BlogContent from "./BlogContent";

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <main className="page-gradient px-4 sm:px-6 py-6 pt-20 pb-10">
          <div className="max-w-5xl mx-auto text-center text-slate-500 dark:text-slate-400">
            Loading blog...
          </div>
        </main>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
