"use client";

import Link from "next/link";
import { ArrowRight, Layers, Users, MessageSquare } from "lucide-react";
import PageAutoScroll from "../components/PageAutoScroll";
import styles from "./skills.module.css";

const pillars = [
  {
    label: "Core practice",
    title: "Full-stack development",
    text: "Hands-on across frontend, backend, and SQL — React/Next.js, .NET/Node APIs, and database design in production environments.",
    highlights: ["React & Next.js", ".NET & Node", "SQL & data"],
    icon: Layers,
    accentClass: styles.pillarAccent1,
  },
  {
    label: "Leadership",
    title: "Technical team lead",
    text: "Mentors engineers, shapes architecture, runs code review, and drives delivery while staying close to the codebase.",
    highlights: ["Mentoring", "Architecture", "Code review"],
    icon: Users,
    accentClass: styles.pillarAccent2,
  },
  {
    label: "Client-facing",
    title: "Customer & stakeholder handling",
    text: "Works directly with clients and stakeholders — requirements, scope, progress updates, and reliable follow-through across time zones.",
    highlights: ["Requirements", "Progress updates", "Stakeholders"],
    icon: MessageSquare,
    accentClass: styles.pillarAccent3,
  },
];

const skillProfile = [
  {
    category: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Tailwind CSS",
      "jQuery",
      "Angular",
      "AngularJS",
      "PrimeNG",
      "RxJS",
      "MEAN",
      "MERN",
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "Django",
      "C#",
      "LINQ",
      "ASP.NET MVC",
      "Web API",
      "REST APIs",
      "Entity Framework",
      "EF Core",
      "ADO.NET",
      "Ajax",
      "Microservices",
      "RabbitMQ",
    ],
  },
  {
    category: "Database",
    skills: [
      "MS SQL Server",
      "PostgreSQL",
      "SQLite",
      "MongoDB",
      "T-SQL",
      "DDL",
      "DML",
      "DCL",
      "Datatypes",
      "Constraints",
      "Triggers",
      "Indexes",
      "Filters",
      "Sorting",
      "Functions",
      "Joins",
      "Transactions",
      "CTE",
      "Temp tables",
      "Views",
      "SQL Job",
      "Query optimisation",
      "RDLC",
      "Crystal Reports",
      "SSRS",
    ],
  },
  {
    category: "Cloud ",
    skills: [
      "Figma",
      "Azure",
      "Azure DevOps",
      "Azure App Service",
      "Azure SQL",
      "Azure Functions",
      "Azure Key Vault",
      "Azure Storage",
      "Entra ID",
      "Docker",
      "CI/CD",
      "Git",
      "GitHub",
      "Jira",
      "VS Code",
      "Postman",
      "Swagger",
    ],
  },
  {
    category: "Principles",
    skills: [
      "OOP",
      "SOLID",
      "Design patterns",
      "Gang of Four",
      "DDD",
      "ACID",
      "Data structures",
      "Algorithms",
      "Unit testing",
      "Agile",
      "Scrum",
    ],
  },
  {
    category: "Leadership",
    skills: [
      "Technical leadership",
      "Team mentoring",
      "Code review",
      "Code smell",
      "Architecture",
      "Customer communication",
    ],
  },
  {
    category: "AI-Acceleration",
    skills: ["ChatGPT", "Claude", "Cursor", "Gemini", "AI-assisted development"],
  },
];

const strengths = [
  "Clear concept and strong grounding in OOP, data structures & algorithms, and design patterns; delivers maintainable software with clear structure and consistent standards.",
  "Worked in complex business domains with full-stack capability across frontend, backend, and SQL development; able to find and resolve problems in complex SQL queries.",
  "Able to work under delivery pressure and meet deadlines within a defined time frame while maintaining quality.",
  "Good team player, willing to accept responsibility, and able to adapt in changing environments; comfortable in remote, cross-border teams with async communication, balancing hands-on development with mentoring and technical direction.",
  "Quick learner with the ability to grasp new technology & concepts and an effective working method in short time; enthusiastic, self-motivated, confident, patient, positive, optimistic, and friendly as a person.",
];

export default function SkillsPage() {
  return (
    <main className={`page-gradient min-w-0 overflow-x-hidden ${styles.page}`}>
      <PageAutoScroll />
      <div className={styles.inner}>
        <article className={styles.sheet}>
          <header className={styles.hero} data-page-section>
            <h1 className={styles.title}>I Believe</h1>
            <p className={styles.summary}>
              No one is born with technology skills. Technology was created by people of this world,
              and since I am also one of the people living in this world, I can learn it too. There
              is no magic involved. All it takes is time, consistent practice, dedication,
              patience, perseverance, and hard working.
            </p>
          </header>

          <section className={styles.pillarsSection} aria-label="Role overview">
            <div className={styles.pillarsHeader}>
              <h2 className={styles.pillarsHeading}>How I work</h2>
              <p className={styles.pillarsSubheading}>
                Full-stack delivery, technical leadership, and client engagement
              </p>
            </div>

            <div className={styles.pillars}>
              {pillars.map(({ label, title, text, highlights, icon: Icon, accentClass }) => (
                <article key={title} className={styles.pillar}>
                  <div className={`${styles.pillarGlow} ${accentClass}`} aria-hidden />
                  <div className={styles.pillarTop} aria-hidden />

                  <div className={styles.pillarBody}>
                    <div className={styles.pillarHead}>
                      <span className={styles.pillarIcon}>
                        <Icon className={styles.pillarIconSvg} strokeWidth={2.1} />
                      </span>
                      <span className={styles.pillarLabel}>{label}</span>
                    </div>

                    <h2 className={styles.pillarTitle}>{title}</h2>
                    <p className={styles.pillarText}>{text}</p>

                    <ul className={styles.pillarTags}>
                      {highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className={styles.body}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Technical Skills</h2>
            </div>

            <div className={styles.tableWrap}>
              <table className={`${styles.table} ${styles.skillsTable}`}>
                <caption className={styles.tableCaption}>
                  Technical skills grouped by competence area
                </caption>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Skills &amp; technologies</th>
                  </tr>
                </thead>
                <tbody>
                  {skillProfile.map(({ category, skills }) => (
                    <tr key={category}>
                      <th scope="row" className={styles.categoryCell}>
                        {category}
                      </th>
                      <td className={styles.skillsCell}>
                        <div className={styles.skillPills}>
                          {skills.map((skill) => (
                            <span key={skill} className={styles.skillPill}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.divider} aria-hidden />

            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Professional strengths</h2>
            </div>

            <div className={styles.tableWrap}>
              <table className={`${styles.table} ${styles.strengthsTable}`}>
                <caption className={styles.tableCaption}>
                  Key professional attributes
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className={styles.strengthCol}>
                      No.
                    </th>
                    <th scope="col">Professional strength</th>
                  </tr>
                </thead>
                <tbody>
                  {strengths.map((text, index) => (
                    <tr key={text}>
                      <td className={styles.strengthIndex}>{index + 1}.</td>
                      <td className={styles.strengthCell}>{text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <footer className={styles.footer}>
            <p className={styles.footerText}>
              Full career history and project context are available on the experience page.
            </p>
            <div className={styles.footerActions}>
              <Link href="/experience" className={styles.primaryLink}>
                Experience
                <ArrowRight size={15} aria-hidden />
              </Link>
              <Link href="/contact" className={styles.secondaryLink}>
                Contact
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
