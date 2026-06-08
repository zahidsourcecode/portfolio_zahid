"use client";

import { useState } from "react";
import Link from "next/link";

const projects = [
  {
    id: "todo",
    title: "To-Do List",
    role: "Task Manager App",
    tags: ["React", "Kanban", "Productivity"],
    logo: "/portfolio_img.jpg",
    description: "A Kanban board for managing tasks.",
    iframeSrc: "https://kanban-board-sigma-sepia.vercel.app/",
    bg: "bg-orange-100 dark:bg-orange-950/40",
  },
  {
    id: "movie",
    title: "Movie website",
    role: "Movie Search App",
    tags: ["React", "API", "Movies"],
    logo: "/portfolio_img.jpg",
    description: "A simple movie website to search, view, and manage movies.",
    iframeSrc: "https://movie-app-ashen-iota-35.vercel.app/",
    bg: "bg-green-100 dark:bg-green-950/40",
  },
  {
    id: "eschool",
    title: "E-School Landing Page",
    role: "E School Landing Page",
    tags: ["HTML", "CSS", "Bootstrap"],
    logo: "/portfolio_img.jpg",
    description:
      "A static educational landing page built using HTML, CSS, and Bootstrap.",
    iframeSrc: "",
    bg: "bg-blue-100 dark:bg-blue-950/40",
  },
  {
    id: "crudapp",
    title: "Full-Stack CRUD App",
    role: "User Management System",
    tags: ["React", "MongoDB", "Express", "Node.js"],
    logo: "/portfolio_img.jpg",
    description:
      "A full-stack application to manage users. Features include registration, login, and CRUD operations using postman.",
    iframeSrc: "https://crud-frontend-iota-one.vercel.app/",
    bg: "bg-purple-100 dark:bg-purple-950/40",
  },
  {
    id: "courier",
    title: "Courier Package Tracker",
    role: "Real-Time Package Tracker",
    tags: ["Next.js", "Socket.IO", "MongoDB", "Tailwind"],
    logo: "/portfolio_img.jpg",
    description:
      "A real-time package tracking system with alerting and drill-down views for dispatchers.",
    iframeSrc: "https://courier-tracker-frontend-eosin.vercel.app/",
    bg: "bg-yellow-100 dark:bg-yellow-950/40",
  },
];

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="1" />
    <rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="2" width="14" height="2.5" rx="1" />
    <rect x="1" y="6.75" width="14" height="2.5" rx="1" />
    <rect x="1" y="11.5" width="14" height="2.5" rx="1" />
  </svg>
);

export default function Projects() {
  const [view, setView] = useState("grid");

  return (
    <main className="page-gradient px-4 sm:px-6 py-6 pt-20">
      {/* Header row */}
      <div className="flex items-center justify-end mb-6 sm:mb-8 pt-2 sm:pt-5">
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg text-sm font-medium border border-brand cursor-pointer transition ${
              view === "grid" ? "bg-brand text-white" : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200"
            }`}
          >
            <GridIcon />
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg text-sm font-medium border border-brand cursor-pointer transition ${
              view === "list" ? "bg-brand text-white" : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200"
            }`}
          >
            <ListIcon />
            List
          </button>
        </div>
      </div>

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`relative ${project.bg} rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 hover:shadow-2xl transition-shadow border border-gray-100 dark:border-slate-700 flex flex-col min-h-[280px] sm:min-h-[340px]`}
            >
              <div className="font-bold text-xl sm:text-2xl mt-1 sm:mt-2 mb-2 text-gray-900 dark:text-slate-100">
                {project.role}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white dark:bg-slate-800 rounded-full px-3 py-1 text-gray-600 dark:text-slate-300 text-sm font-medium shadow"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mb-4 text-gray-700 dark:text-slate-300 text-sm">
                {project.description}
              </div>
              <div className="flex items-center justify-between mt-auto">
                <Link
                  href={`/details/${project.id}`}
                  className="bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="flex flex-col gap-4 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${project.bg} rounded-2xl shadow border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4`}
            >
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg sm:text-xl text-gray-900 dark:text-slate-100 mb-1">
                  {project.role}
                </div>
                <div className="text-gray-700 dark:text-slate-300 text-sm mb-3">
                  {project.description}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white dark:bg-slate-800 rounded-full text-gray-600 dark:text-slate-300 text-sm font-medium shadow px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 self-start sm:self-center">
                <Link
                  href={`/details/${project.id}`}
                  className="inline-block bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
