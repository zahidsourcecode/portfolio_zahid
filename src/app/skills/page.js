"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Layers, MessageSquare, Users } from "lucide-react";
import PageAutoScroll from "../components/PageAutoScroll";
import PageLoadingState from "../components/PageLoadingState";
import styles from "./skills.module.css";

const PILLAR_ICONS = {
  layers: Layers,
  users: Users,
  messageSquare: MessageSquare,
};

const PILLAR_ACCENTS = {
  pillarAccent1: styles.pillarAccent1,
  pillarAccent2: styles.pillarAccent2,
  pillarAccent3: styles.pillarAccent3,
};

export default function SkillsPage() {
  const [skillsData, setSkillsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSkillsData() {
      try {
        const response = await fetch("/api/skills");

        if (!response.ok) {
          throw new Error("Failed to load skills data");
        }

        const data = await response.json();

        if (!cancelled) {
          setSkillsData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load skills data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSkillsData();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className={`page-gradient min-w-0 overflow-x-hidden ${styles.page}`}>
        <PageAutoScroll />
        <div className={styles.inner}>
          <article className={styles.sheet}>
            <PageLoadingState icon="layers" message="Loading skills data…" />
          </article>
        </div>
      </main>
    );
  }

  if (error || !skillsData) {
    return (
      <main className={`page-gradient min-w-0 overflow-x-hidden ${styles.page}`}>
        <PageAutoScroll />
        <div className={styles.inner}>
          <article className={styles.sheet}>
            <div className={styles.statePanel} role="alert">
              <p className={styles.stateText}>
                {error || skillsData?.pageState?.errorText || "Skills data is unavailable."}
              </p>
              <button
                type="button"
                className={styles.retryBtn}
                onClick={() => window.location.reload()}
              >
                {skillsData?.pageState?.retryLabel || "Try again"}
              </button>
            </div>
          </article>
        </div>
      </main>
    );
  }

  const { hero, pillarsSection, technicalSkills, strengths, footer } = skillsData;

  return (
    <main className={`page-gradient min-w-0 overflow-x-hidden ${styles.page}`}>
      <PageAutoScroll />
      <div className={styles.inner}>
        <article className={styles.sheet}>
          <header className={styles.hero} data-page-section>
            <h1 className={styles.title}>{hero.title}</h1>
            <p className={styles.summary}>{hero.summary}</p>
          </header>

          <section className={styles.pillarsSection} aria-label={pillarsSection.ariaLabel}>
            <div className={styles.pillarsHeader}>
              <h2 className={styles.pillarsHeading}>{pillarsSection.heading}</h2>
              <p className={styles.pillarsSubheading}>{pillarsSection.subheading}</p>
            </div>

            <div className={styles.pillars}>
              {pillarsSection.pillars.map(
                ({ id, label, title, text, highlights, icon, accentClass }) => {
                  const Icon = PILLAR_ICONS[icon];

                  return (
                    <article key={id} className={styles.pillar}>
                      <div
                        className={`${styles.pillarGlow} ${PILLAR_ACCENTS[accentClass] || ""}`}
                        aria-hidden
                      />
                      <div className={styles.pillarTop} aria-hidden />

                      <div className={styles.pillarBody}>
                        <div className={styles.pillarHead}>
                          <span className={styles.pillarIcon}>
                            {Icon && (
                              <Icon className={styles.pillarIconSvg} strokeWidth={2.1} />
                            )}
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
                  );
                }
              )}
            </div>
          </section>

          <div className={styles.body}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{technicalSkills.sectionTitle}</h2>
            </div>

            <div className={styles.tableWrap}>
              <table className={`${styles.table} ${styles.skillsTable}`}>
                <caption className={styles.tableCaption}>{technicalSkills.tableCaption}</caption>
                <thead>
                  <tr>
                    <th scope="col">{technicalSkills.headers.category}</th>
                    <th scope="col">{technicalSkills.headers.skills}</th>
                  </tr>
                </thead>
                <tbody>
                  {technicalSkills.profile.map(({ category, skills }) => (
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
              <h2 className={styles.sectionTitle}>{strengths.sectionTitle}</h2>
            </div>

            <div className={styles.tableWrap}>
              <table className={`${styles.table} ${styles.strengthsTable}`}>
                <caption className={styles.tableCaption}>{strengths.tableCaption}</caption>
                <thead>
                  <tr>
                    <th scope="col" className={styles.strengthCol}>
                      {strengths.headers.number}
                    </th>
                    <th scope="col">{strengths.headers.strength}</th>
                  </tr>
                </thead>
                <tbody>
                  {strengths.items.map((text, index) => (
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
            <p className={styles.footerText}>{footer.text}</p>
            <div className={styles.footerActions}>
              {footer.links.map(({ href, label, variant, showArrow }) =>
                variant === "primary" ? (
                  <Link key={href} href={href} className={styles.primaryLink}>
                    {label}
                    {showArrow && <ArrowRight size={15} aria-hidden />}
                  </Link>
                ) : (
                  <Link key={href} href={href} className={styles.secondaryLink}>
                    {label}
                  </Link>
                )
              )}
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
