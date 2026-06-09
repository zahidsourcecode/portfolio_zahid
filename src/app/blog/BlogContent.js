"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GridIcon, ListIcon } from "../components/ViewToggleIcons";

const AUTHOR_URL = "https://ixorasolution.com/author/zh/";
const POSTS_PER_PAGE = 3;

const blogPosts = [
  {
    id: "cloud-deployment-net",
    title: "Cloud Deployment .NET Apps with SQL Free",
    date: "August 10, 2025",
    categories: ["General", "Process"],
    excerpt:
      "A step-by-step guide to hosting .NET apps with a cloud SQL database for free — no credit card required. Covers SmarterASP.net, Render, Railway, and more.",
    url: "https://ixorasolution.com/blog/cloud-deployment-net-apps-with-sql-free/",
    image: "https://ixorasolution.com/wp-content/uploads/Cloud-Deployement.jpg",
    bg: "bg-sky-100 dark:bg-sky-950/40",
  },
  {
    id: "zustand-state-management",
    title: "Dive into Zustand for Effortless State Management",
    date: "December 4, 2023",
    categories: ["General"],
    excerpt:
      "Why Zustand is a lightweight alternative to Redux for React — simpler API, less boilerplate, hooks-based state, and when to choose it for your project.",
    url: "https://ixorasolution.com/blog/dive-into-zustand-for-effortless-state-management/",
    image: "https://ixorasolution.com/wp-content/uploads/Picture6-1.png",
    bg: "bg-teal-100 dark:bg-teal-950/40",
  },
  {
    id: "optimized-sql",
    title: "Optimized SQL Query Writing",
    date: "August 31, 2023",
    categories: ["Programming", "Technology"],
    excerpt:
      "Practical SQL optimization tips: avoid SELECT *, reduce cursors, use indexes wisely, prefer JOINs over IN, and break down large queries for better performance.",
    url: "https://ixorasolution.com/blog/optimized-sql-query-writing/",
    image: "https://ixorasolution.com/wp-content/uploads/SQL-2.gif",
    bg: "bg-indigo-100 dark:bg-indigo-950/40",
  },
  {
    id: "separation-of-concerns-react",
    title: "Separation of Concerns in React",
    date: "December 27, 2022",
    categories: ["General", "Programming", "Technology"],
    excerpt:
      "How to decouple logic from UI in React using custom hooks, smart/dumb components, and modular CSS — with guidelines for naming and testing.",
    url: "https://ixorasolution.com/blog/separation-of-concerns-in-react/",
    image: "https://ixorasolution.com/wp-content/uploads/Separation-of-Concerns-in-React.jpg",
    bg: "bg-violet-100 dark:bg-violet-950/40",
  },
];

function BlogImage({ post, variant = "grid" }) {
  if (variant === "grid") {
    return (
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-44 sm:h-48 object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </a>
    );
  }

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block shrink-0 overflow-hidden rounded-xl"
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-full sm:w-44 md:w-52 h-40 sm:h-full sm:min-h-[160px] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </a>
  );
}

function CategoryTags({ categories }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <span
          key={cat}
          className="bg-white/80 dark:bg-slate-800/80 rounded-full px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300"
        >
          {cat}
        </span>
      ))}
    </div>
  );
}

function BlogTitle({ post }) {
  return (
    <h2 className="mb-2 leading-snug">
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 hover:text-brand-dark dark:hover:text-brand transition-all duration-200 hover:scale-105 origin-left"
      >
        {post.title}
      </a>
    </h2>
  );
}

function ReadButton({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 w-fit px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark shadow-sm shadow-brand/20 hover:shadow-brand/35 transition-colors group shrink-0"
    >
      Read article
      <ArrowUpRight
        size={15}
        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
      />
    </a>
  );
}

export default function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState("grid");

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Number.isNaN(rawPage)
    ? 1
    : Math.min(Math.max(rawPage, 1), totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return blogPosts.slice(start, start + POSTS_PER_PAGE);
  }, [currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    router.push(page === 1 ? "/blog" : `/blog?page=${page}`);
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
            <BookOpen size={22} className="text-brand" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              Blog
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Technical articles on React, .NET, SQL, cloud deployment, and software engineering —
            published on{" "}
            <a
              href="https://ixorasolution.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark dark:text-brand hover:underline"
            >
              iXora Solution
            </a>
            .
          </p>
        </div>

        {/* Pagination + view toggle */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {totalPages > 1 ? (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 order-2 sm:order-1">
                Page {currentPage} of {totalPages} · {blogPosts.length} articles
              </p>

              <div className="flex items-center gap-1.5 order-3 sm:order-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="p-2 rounded-lg border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600 dark:disabled:hover:text-slate-300 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="min-w-12 text-center text-sm font-medium text-slate-600 dark:text-slate-300 sm:hidden">
                  {currentPage} / {totalPages}
                </span>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={`hidden sm:inline-flex min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
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
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 order-2 sm:order-1">
              {blogPosts.length} articles
            </p>
          )}

          <div className="flex gap-2 order-1 sm:order-3 self-end sm:self-auto">
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

        {/* Grid view */}
        {view === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className={`${post.bg} rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex flex-col hover:shadow-xl transition-shadow overflow-hidden`}
              >
                <BlogImage post={post} variant="grid" />

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <CategoryTags categories={post.categories} />
                </div>

                <BlogTitle post={post} />

                <time className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  {post.date}
                </time>

                <p className="text-sm text-slate-700 dark:text-slate-300 mb-5 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>

                <ReadButton url={post.url} />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <div className="flex flex-col gap-4">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className={`${post.bg} rounded-2xl shadow border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col sm:flex-row sm:items-stretch gap-4`}
              >
                <BlogImage post={post} variant="list" />

                <div className="flex-1 min-w-0 flex flex-col sm:justify-center">
                  <time className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                    {post.date}
                  </time>
                  <BlogTitle post={post} />
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <CategoryTags categories={post.categories} />
                </div>
                <div className="shrink-0 self-start sm:self-center">
                  <ReadButton url={post.url} />
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-dark shadow-md shadow-brand/25 hover:shadow-brand/40 transition-all"
          >
            View my Blog Profile
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </main>
  );
}
