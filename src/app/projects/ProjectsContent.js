"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ExternalLink,
  Github,
  Play,
  X,
} from "lucide-react";
import PageLoadingState from "../components/PageLoadingState";
import ContentToolbar from "../components/ContentToolbar";

function ProjectImage({ project, variant = "grid", comingSoon = false }) {
  const isPortrait = project.imageOrientation === "portrait";

  if (comingSoon) {
    const boxClass =
      variant === "grid"
        ? "flex h-44 sm:h-48 w-full items-center justify-center bg-gradient-to-br from-slate-200/80 via-white to-brand/20 dark:from-slate-800 dark:via-slate-900 dark:to-brand/10"
        : "flex h-40 w-full sm:w-44 md:w-52 sm:min-h-[160px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-200/80 via-white to-brand/20 dark:from-slate-800 dark:via-slate-900 dark:to-brand/10";

    return (
      <div className={boxClass} aria-hidden="true">
        <span className="rounded-full border border-brand/25 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark shadow-sm dark:bg-slate-800/90 dark:text-brand">
          Coming Soon
        </span>
      </div>
    );
  }

  if (isPortrait && variant === "grid") {
    const image = (
      <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-slate-900/90 via-slate-800 to-brand/20 px-4 py-3 sm:h-64 sm:px-6 sm:py-4">
        <img
          src={project.image}
          alt={project.role}
          className="h-full w-auto max-w-full rounded-xl object-contain shadow-lg shadow-black/30"
          loading="lazy"
        />
      </div>
    );

    if (!project.iframeSrc) {
      return <div className="block overflow-hidden">{image}</div>;
    }

    return (
      <Link href={`/details/${project.id}`} className="block overflow-hidden">
        {image}
      </Link>
    );
  }

  if (isPortrait && variant === "list") {
    const image = (
      <div className="flex h-48 w-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-900/90 via-slate-800 to-brand/20 p-3 sm:h-full sm:min-h-[180px] sm:w-36 md:w-40">
        <img
          src={project.image}
          alt={project.role}
          className="h-full w-auto max-w-full rounded-lg object-contain shadow-md shadow-black/25"
          loading="lazy"
        />
      </div>
    );

    if (!project.iframeSrc) {
      return <div className="block w-full shrink-0 overflow-hidden sm:w-auto">{image}</div>;
    }

    return (
      <Link
        href={`/details/${project.id}`}
        className="block w-full shrink-0 overflow-hidden sm:w-auto"
      >
        {image}
      </Link>
    );
  }

  const image =
    variant === "grid" ? (
      <img
        src={project.image}
        alt={project.role}
        className="h-44 w-full object-cover object-top transition-transform duration-300 hover:scale-105 sm:h-48"
        loading="lazy"
      />
    ) : (
      <img
        src={project.image}
        alt={project.role}
        className="h-40 w-full rounded-xl object-cover object-top transition-transform duration-300 hover:scale-105 sm:h-full sm:min-h-[160px] sm:w-44 md:w-52"
        loading="lazy"
      />
    );

  if (!project.iframeSrc) {
    return variant === "grid" ? (
      <div className="block overflow-hidden">{image}</div>
    ) : (
      <div className="block shrink-0 overflow-hidden rounded-xl">{image}</div>
    );
  }

  if (variant === "grid") {
    return (
      <Link href={`/details/${project.id}`} className="block overflow-hidden">
        {image}
      </Link>
    );
  }

  return (
    <Link
      href={`/details/${project.id}`}
      className="block shrink-0 overflow-hidden rounded-xl"
    >
      {image}
    </Link>
  );
}

function TagList({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-white/80 dark:bg-slate-800/80 rounded-full px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectTitle({ project, comingSoon = false }) {
  if (comingSoon) {
    return (
      <h2 className="mb-2 min-w-0 break-words leading-snug font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100">
        {project.role}
      </h2>
    );
  }

  return (
    <h2 className="mb-2 min-w-0 leading-snug">
      <Link
        href={`/details/${project.id}`}
        className="inline-block max-w-full break-words font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 hover:text-brand-dark dark:hover:text-brand transition-all duration-200 hover:scale-105 origin-left"
      >
        {project.role}
      </Link>
    </h2>
  );
}

function DemoVideoButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-brand/35 bg-white/90 px-3 py-2.5 text-sm font-semibold text-brand-dark shadow-sm transition-colors hover:border-brand hover:bg-brand-light/50 group cursor-pointer sm:w-auto sm:px-4 dark:bg-slate-800/90 dark:text-brand dark:hover:bg-brand/10"
    >
      <Play size={15} aria-hidden className="fill-current shrink-0" />
      {label}
    </button>
  );
}

function GitHubButton({ githubUrl, label, comingSoon = false, onComingSoonClick }) {
  const className =
    "inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand/20 transition-colors hover:bg-brand-dark hover:shadow-brand/35 group cursor-pointer sm:w-auto sm:px-4";

  if (comingSoon) {
    return (
      <button type="button" onClick={onComingSoonClick} className={className}>
        <Github size={15} aria-hidden className="shrink-0" />
        {label}
        <ExternalLink
          size={14}
          className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
    );
  }

  if (!githubUrl) return null;

  return (
    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={className}>
      <Github size={15} aria-hidden className="shrink-0" />
      {label}
      <ExternalLink
        size={14}
        className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

function LiveDemoButton({ demoUrl, label, comingSoon = false, onComingSoonClick }) {
  const className =
    "inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-brand/35 bg-white/90 px-3 py-2.5 text-sm font-semibold text-brand-dark shadow-sm transition-colors hover:border-brand hover:bg-brand-light/50 group cursor-pointer sm:w-auto sm:px-4 dark:bg-slate-800/90 dark:text-brand dark:hover:bg-brand/10";

  if (comingSoon) {
    return (
      <button type="button" onClick={onComingSoonClick} className={className}>
        {label}
        <ExternalLink
          size={15}
          className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
    );
  }

  if (!demoUrl) return null;

  return (
    <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
      <ExternalLink
        size={15}
        className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

function ProjectActions({
  githubUrl,
  demoUrl,
  demoLabel,
  demoVideoSrc,
  labels,
  comingSoon = false,
  onDemoVideoClick,
  onComingSoonClick,
}) {
  const githubComingSoon = comingSoon || !githubUrl;
  const liveComingSoon = comingSoon || !demoUrl;
  const videoComingSoon = comingSoon && !demoVideoSrc;

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <DemoVideoButton
        onClick={
          videoComingSoon
            ? onComingSoonClick
            : () => onDemoVideoClick(demoVideoSrc || null)
        }
        label={labels.demoVideo}
      />
      <GitHubButton
        githubUrl={githubUrl}
        label={labels.github}
        comingSoon={githubComingSoon}
        onComingSoonClick={onComingSoonClick}
      />
      <LiveDemoButton
        demoUrl={demoUrl}
        label={demoLabel || labels.liveDemo}
        comingSoon={liveComingSoon}
        onComingSoonClick={onComingSoonClick}
      />
    </div>
  );
}

function ProjectCard({
  project,
  view,
  labels,
  comingSoon = false,
  onDemoVideoClick,
  onComingSoonClick,
}) {
  const imageComingSoon = comingSoon || !project.image;
  const titleComingSoon = comingSoon || !project.iframeSrc;

  if (view === "list") {
    return (
      <article
        className={`${project.bg} flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-100 p-4 shadow transition-shadow hover:shadow-lg sm:flex-row sm:items-stretch sm:p-6 dark:border-slate-700`}
      >
        <ProjectImage project={project} variant="list" comingSoon={imageComingSoon} />

        <div className="flex-1 min-w-0 flex flex-col sm:justify-center">
          <ProjectTitle project={project} comingSoon={titleComingSoon} />
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
            {project.description}
          </p>
          <TagList tags={project.tags} />
        </div>

        <div className="w-full shrink-0 self-stretch sm:w-auto sm:self-center">
          <ProjectActions
            githubUrl={project.githubUrl}
            demoUrl={project.downloadApkUrl || project.iframeSrc}
            demoLabel={project.downloadApkUrl ? labels.downloadApk : labels.liveDemo}
            demoVideoSrc={project.demoVideoSrc}
            labels={labels}
            comingSoon={comingSoon}
            onDemoVideoClick={onDemoVideoClick}
            onComingSoonClick={onComingSoonClick}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className={`${project.bg} min-w-0 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex flex-col hover:shadow-xl transition-shadow overflow-hidden`}
    >
      <ProjectImage project={project} variant="grid" comingSoon={imageComingSoon} />

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
        <div className="mb-3">
          <TagList tags={project.tags} />
        </div>

        <ProjectTitle project={project} comingSoon={titleComingSoon} />

        <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {project.description}
        </p>

        <ProjectActions
          githubUrl={project.githubUrl}
          demoUrl={project.downloadApkUrl || project.iframeSrc}
          demoLabel={project.downloadApkUrl ? labels.downloadApk : labels.liveDemo}
          demoVideoSrc={project.demoVideoSrc}
          labels={labels}
          comingSoon={comingSoon}
          onDemoVideoClick={onDemoVideoClick}
          onComingSoonClick={onComingSoonClick}
        />
      </div>
    </article>
  );
}

export default function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState("grid");
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [demoVideo, setDemoVideo] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const showDemoVideo = Boolean(demoVideo);

  useEffect(() => {
    let cancelled = false;

    async function loadProjectsData() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to load projects data");
        }

        const data = await response.json();

        if (!cancelled) {
          setProjectsData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load projects data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProjectsData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!showDemoVideo && !showComingSoon) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDemoVideo(null);
        setShowComingSoon(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [showDemoVideo, showComingSoon]);

  const projects = projectsData?.projects ?? [];
  const cloudProjects = projectsData?.cloudProjects ?? [];
  const mobileAppProjects = projectsData?.mobileAppProjects ?? [];
  const upcomingProjects = projectsData?.upcomingProjects ?? [];
  const projectsPerPage = projectsData?.settings?.projectsPerPage ?? 4;
  const tabParam = searchParams.get("tab");
  const activeTab =
    tabParam === "cloud" || tabParam === "upcoming" || tabParam === "mobile-app"
      ? tabParam
      : "live";
  const projectsByTab = {
    live: projects,
    cloud: cloudProjects,
    "mobile-app": mobileAppProjects,
    upcoming: upcomingProjects,
  };
  const activeProjects = projectsByTab[activeTab] ?? projects;
  const isComingSoonTab = activeTab === "cloud" || activeTab === "upcoming";

  const totalPages = Math.ceil(activeProjects.length / projectsPerPage) || 1;
  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Number.isNaN(rawPage)
    ? 1
    : Math.min(Math.max(rawPage, 1), Math.max(totalPages, 1));

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * projectsPerPage;
    return activeProjects.slice(start, start + projectsPerPage);
  }, [activeProjects, currentPage, projectsPerPage]);

  const buildProjectsHref = (tab, page) => {
    const params = new URLSearchParams();
    if (tab === "cloud" || tab === "upcoming" || tab === "mobile-app") {
      params.set("tab", tab);
    }
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    return query ? `/projects?${query}` : "/projects";
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    router.push(buildProjectsHref(activeTab, page));
  };

  const setActiveTab = (tab) => {
    router.push(buildProjectsHref(tab, 1));
  };

  const viewBtnClass = (mode) =>
    `inline-flex min-h-11 items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg text-sm font-medium border border-brand cursor-pointer transition ${
      view === mode
        ? "bg-brand text-white"
        : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200"
    }`;

  const tabBtnClass = (tab) =>
    `inline-flex min-h-10 sm:min-h-11 flex-1 sm:flex-none items-center justify-center rounded-lg px-1.5 sm:px-3 py-2 text-[0.7rem] sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
      activeTab === tab
        ? "bg-brand text-white shadow-md shadow-brand/25"
        : "bg-white/90 text-slate-600 hover:bg-brand-light/50 hover:text-brand-dark dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-brand/10 dark:hover:text-brand"
    }`;

  if (loading) {
    return (
      <main className="page-gradient flex min-h-screen min-w-0 items-center justify-center overflow-x-hidden px-3 py-6 pb-4 pt-16 sm:px-6 sm:pt-20">
        <PageLoadingState icon="folderKanban" message="Loading projects data…" />
      </main>
    );
  }

  if (error || !projectsData) {
    return (
      <main className="page-gradient flex min-h-screen min-w-0 items-center justify-center overflow-x-hidden px-3 py-6 pb-4 pt-16 sm:px-6 sm:pt-20">
        <div className="mx-auto flex max-w-5xl min-w-0 flex-col items-center gap-3 text-center">
          <p className="text-slate-500 dark:text-slate-400" role="alert">
            {error || projectsData?.pageState?.errorText || "Projects data is unavailable."}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand/30 px-4 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand/10 dark:text-brand"
          >
            {projectsData?.pageState?.retryLabel || "Try again"}
          </button>
        </div>
      </main>
    );
  }

  const { header, labels, settings } = projectsData;
  const defaultDemoVideoEmbedUrl = settings.demoVideoEmbedUrl;
  const openDemoVideo = (src) => {
    const project = activeProjects.find((item) => item.demoVideoSrc === src);
    setDemoVideo({
      src: src || defaultDemoVideoEmbedUrl,
      title: project?.demoVideoTitle || settings.demoVideoModalTitle,
      isFile: Boolean(src && /\.(mp4|webm|ogg)(\?|$)/i.test(src)),
    });
  };
  const closeDemoVideo = () => setDemoVideo(null);
  const openComingSoon = () => setShowComingSoon(true);

  return (
    <main className="page-gradient !min-h-0 min-w-0 overflow-x-hidden px-3 py-6 pb-4 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-5xl min-w-0">
        <div className="mb-3">
          <h1 className="sr-only">{header.title}</h1>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {header.description}
          </p>
        </div>

        <ContentToolbar
          leading={
            <div
              className="inline-flex w-full gap-1 rounded-xl border border-brand/20 bg-brand-light/30 p-1 dark:border-brand/15 dark:bg-slate-900/50 sm:w-auto sm:gap-1.5 sm:p-1.5"
              role="tablist"
              aria-label={labels.projectsTabAriaLabel}
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "live"}
                onClick={() => setActiveTab("live")}
                className={tabBtnClass("live")}
              >
                {labels.liveProjectsTab}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "cloud"}
                onClick={() => setActiveTab("cloud")}
                className={tabBtnClass("cloud")}
              >
                {labels.cloudProjectsTab}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "mobile-app"}
                onClick={() => setActiveTab("mobile-app")}
                className={tabBtnClass("mobile-app")}
              >
                <span className="sm:hidden">Mobile</span>
                <span className="hidden sm:inline">{labels.mobileAppProjectsTab}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "upcoming"}
                onClick={() => setActiveTab("upcoming")}
                className={tabBtnClass("upcoming")}
              >
                {labels.upcomingProjectsTab}
              </button>
            </div>
          }
          statusText={`Total ${activeProjects.length} Projects`}
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={goToPage}
          labels={labels}
          view={view}
          setView={setView}
          viewBtnClass={viewBtnClass}
          className="mb-3"
        />

        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {paginatedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                view="grid"
                labels={labels}
                comingSoon={isComingSoonTab}
                onDemoVideoClick={openDemoVideo}
                onComingSoonClick={openComingSoon}
              />
            ))}
          </div>
        )}

        {view === "list" && (
          <div className="flex flex-col gap-4">
            {paginatedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                view="list"
                labels={labels}
                comingSoon={isComingSoonTab}
                onDemoVideoClick={openDemoVideo}
                onComingSoonClick={openComingSoon}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ${
          showDemoVideo ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDemoVideo}
        aria-hidden={!showDemoVideo}
      >
        <div
          className="relative flex w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[90vh] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-brand/25 bg-white shadow-2xl shadow-brand/20 dark:border-brand/20 dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={demoVideo?.title || settings.demoVideoModalTitle}
        >
          <div className="flex items-center justify-between gap-2 border-b border-brand/20 bg-gradient-to-r from-brand/20 via-brand/10 to-transparent px-3 py-2.5 sm:px-5 sm:py-3">
            <h2 className="text-sm sm:text-base font-semibold text-brand-dark dark:text-brand">
              {demoVideo?.title || settings.demoVideoModalTitle}
            </h2>
            <button
              type="button"
              onClick={closeDemoVideo}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-brand/15 p-2 text-brand-dark transition hover:bg-brand hover:text-white dark:text-brand cursor-pointer"
              aria-label={labels.closeVideoAriaLabel}
            >
              <X size={18} />
            </button>
          </div>

          {showDemoVideo && demoVideo?.isFile ? (
            <div className="relative w-full bg-black">
              <video
                key={demoVideo.src}
                src={demoVideo.src}
                className="max-h-[min(70vh,28rem)] w-full object-contain"
                controls
                autoPlay
                playsInline
                title={demoVideo.title}
              />
            </div>
          ) : null}

          {showDemoVideo && !demoVideo?.isFile ? (
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`${demoVideo.src}?autoplay=1`}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={demoVideo.title}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ${
          showComingSoon ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowComingSoon(false)}
        aria-hidden={!showComingSoon}
      >
        <div
          className="relative w-full sm:max-w-md overflow-hidden rounded-t-2xl sm:rounded-2xl border border-brand/25 bg-white p-5 sm:p-6 shadow-2xl shadow-brand/20 dark:border-brand/20 dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-title"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2
                id="coming-soon-title"
                className="text-lg font-bold text-brand-dark dark:text-brand"
              >
                {labels.comingSoonTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {labels.comingSoonMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowComingSoon(false)}
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full bg-brand/15 p-2 text-brand-dark transition hover:bg-brand hover:text-white dark:text-brand cursor-pointer"
              aria-label={labels.comingSoonCloseLabel}
            >
              <X size={18} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowComingSoon(false)}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark cursor-pointer"
          >
            {labels.comingSoonCloseLabel}
          </button>
        </div>
      </div>
    </main>
  );
}
