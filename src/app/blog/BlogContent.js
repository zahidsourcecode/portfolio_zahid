"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GridIcon, ListIcon } from "../components/ViewToggleIcons";
import PageLoadingState from "../components/PageLoadingState";

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

function ReadButton({ url, label }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 w-fit px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark shadow-sm shadow-brand/20 hover:shadow-brand/35 transition-colors group shrink-0"
    >
      {label}
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
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadBlogData() {
      try {
        const response = await fetch("/api/blog");

        if (!response.ok) {
          throw new Error("Failed to load blog data");
        }

        const data = await response.json();

        if (!cancelled) {
          setBlogData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load blog data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBlogData();

    return () => {
      cancelled = true;
    };
  }, []);

  const posts = blogData?.posts ?? [];
  const postsPerPage = blogData?.settings?.postsPerPage ?? 3;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Number.isNaN(rawPage)
    ? 1
    : Math.min(Math.max(rawPage, 1), Math.max(totalPages, 1));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return posts.slice(start, start + postsPerPage);
  }, [currentPage, posts, postsPerPage]);

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

  if (loading) {
    return (
      <main className="page-gradient min-w-0 overflow-x-hidden px-3 py-6 pb-10 pt-16 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-5xl min-w-0">
          <PageLoadingState icon="bookOpen" message="Loading blog data…" />
        </div>
      </main>
    );
  }

  if (error || !blogData) {
    return (
      <main className="page-gradient min-w-0 overflow-x-hidden px-3 py-6 pb-10 pt-16 sm:px-6 sm:pt-20">
        <div className="mx-auto flex max-w-5xl min-w-0 flex-col items-center gap-3 text-center">
          <p className="text-slate-500 dark:text-slate-400" role="alert">
            {error || blogData?.pageState?.errorText || "Blog data is unavailable."}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full border border-brand/30 px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand/10 dark:text-brand"
          >
            {blogData?.pageState?.retryLabel || "Try again"}
          </button>
        </div>
      </main>
    );
  }

  const { header, labels, authorProfile } = blogData;

  return (
    <main className="page-gradient min-w-0 overflow-x-hidden px-3 py-6 pb-10 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-5xl min-w-0">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={22} className="text-brand" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              {header.title}
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            {header.description}{" "}
            <a
              href={header.publisher.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark dark:text-brand hover:underline"
            >
              {header.publisher.name}
            </a>
            .
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2 sm:gap-3">
          <p className="min-w-0 flex-1 truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            {totalPages > 1
              ? `Page ${currentPage} of ${totalPages} · ${posts.length} articles`
              : `${posts.length} articles`}
          </p>

          {totalPages > 1 && (
            <nav
              aria-label={labels.paginationAriaLabel}
              className="flex shrink-0 items-center justify-center gap-1 sm:gap-1.5"
            >
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label={labels.previousPageAriaLabel}
                className="p-2 rounded-lg border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600 dark:disabled:hover:text-slate-300 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  aria-label={`${labels.pageAriaLabel} ${page}`}
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
                aria-label={labels.nextPageAriaLabel}
                className="p-2 rounded-lg border border-brand/20 dark:border-brand/15 text-slate-600 dark:text-slate-300 hover:bg-brand hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600 dark:disabled:hover:text-slate-300 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </nav>
          )}

          <div className={`flex shrink-0 gap-1.5 sm:gap-2 ${totalPages > 1 ? "flex-1 justify-end" : ""}`}>
            <button onClick={() => setView("grid")} className={viewBtnClass("grid")}>
              <GridIcon />
              {labels.grid}
            </button>
            <button onClick={() => setView("list")} className={viewBtnClass("list")}>
              <ListIcon />
              {labels.list}
            </button>
          </div>
        </div>

        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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

                  <ReadButton url={post.url} label={labels.readArticle} />
                </div>
              </article>
            ))}
          </div>
        )}

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
                  <ReadButton url={post.url} label={labels.readArticle} />
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href={authorProfile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-dark shadow-md shadow-brand/25 hover:shadow-brand/40 transition-all"
          >
            {authorProfile.label}
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </main>
  );
}
