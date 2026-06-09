"use client";

import Link from "next/link";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import styles from "./skills.module.css";

const pillars = [
  {
    label: "Primary",
    title: "Frontend engineering",
    text: "React, Next.js, and TypeScript for accessible, production-grade interfaces.",
  },
  {
    label: "Supporting",
    title: "Backend & data",
    text: "Node.js, .NET APIs, SQL Server, PostgreSQL, and MongoDB in enterprise contexts.",
  },
  {
    label: "Current role",
    title: "Technical leadership",
    text: "Team mentoring, architecture, code review, and delivery in distributed teams.",
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
      "ASP.NET MVC",
      "Web API",
      "REST APIs",
      "Entity Framework",
      "EF Core",
      "LINQ",
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
    category: "Cloud & tooling",
    skills: [
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
      "Figma",
    ],
  },
  {
    category: "Engineering practice",
    skills: [
      "OOP",
      "SOLID",
      "Design patterns",
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
      "Architecture",
      "Stakeholder communication",
    ],
  },
  {
    category: "AI-assisted delivery",
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
    <main className={`page-gradient ${styles.page}`}>
      <div className={styles.inner}>
        <article className={styles.sheet}>
          <header className={styles.hero}>
            <h1 className={styles.title}>Skills</h1>
            <p className={styles.role}>Technical Team Lead · Software Engineer</p>
            <p className={styles.summary}>
              A concise technical profile for senior engineering roles across the EU — focused on
              modern web development, reliable delivery, and collaborative leadership in remote
              settings.
            </p>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <Globe size={14} className="text-brand" aria-hidden />
                <strong>Languages:</strong> English, Bengali
              </span>
              <span className={styles.metaItem}>
                <MapPin size={14} className="text-brand" aria-hidden />
                <strong>Work model:</strong> Remote, hybrid
              </span>
              <span className={styles.metaItem}>
                <strong>Availability:</strong> EU time-zone overlap
              </span>
            </div>
          </header>

          <section className={styles.pillars} aria-label="Core competencies">
            {pillars.map((pillar) => (
              <div key={pillar.title} className={styles.pillar}>
                <p className={styles.pillarLabel}>{pillar.label}</p>
                <h2 className={styles.pillarTitle}>{pillar.title}</h2>
                <p className={styles.pillarText}>{pillar.text}</p>
              </div>
            ))}
          </section>

          <div className={styles.body}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Technical profile</h2>
            </div>

            <div className={styles.tableWrap}>
              <table className={`${styles.table} ${styles.skillsTable}`}>
                <caption className={styles.tableCaption}>
                  Technical skills grouped by competence area
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Competence area</th>
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
                        {skills.map((skill) => (
                          <span key={skill} className={styles.skill}>
                            {skill}
                          </span>
                        ))}
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
