import { notFound } from "next/navigation";
import Link from "next/link";

const projects = [
  {
    id: "todo",
    title: "To-Do List",
    role: "Task Manager App",
    tags: ["React", "Kanban", "Productivity"],
    iframeSrc: "https://kanban-board-sigma-sepia.vercel.app/",
  },
  {
    id: "movie",
    title: "Movie website",
    role: "Movie Search App",
    tags: ["React", "API", "Movies"],
    iframeSrc: "https://movie-app-ashen-iota-35.vercel.app/",
  },
  {
    id: "eschool",
    title: "E-School Landing Page",
    role: "E School Landing Page",
    tags: ["HTML", "CSS", "Bootstrap"],
    iframeSrc: "",
  },
  {
    id: "crudapp",
    title: "Full-Stack CRUD App",
    role: "User Management System",
    tags: ["React", "MongoDB", "Express", "Node.js"],
    logo: "/portfolio_img.jpg",
    description:
      "A full-stack application to manage users. Features include registration, login, and CRUD operations uisng postman.",
    iframeSrc: "https://crud-frontend-iota-one.vercel.app/",
    
  },
  {
  id: "courier",
  title: "Courier Package Tracker",
  role: "Real-Time Package Tracker",
  tags: ["Next.js", "Socket.IO", "MongoDB", "Tailwind"],
  logo: "/portfolio_img.jpg", // update this if you have a custom image
  description:
    "A real-time package tracking system with alerting and drill-down views for dispatchers.",
  iframeSrc: "https://courier-tracker-frontend-eosin.vercel.app/",
  bg: "bg-yellow-100",
},

];

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
