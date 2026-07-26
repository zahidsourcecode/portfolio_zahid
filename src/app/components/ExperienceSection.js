"use client";

import { useEffect, useState } from "react";
import CompanyExperience from "./experience/CompanyExperience";
import { CareerDurationStats } from "./experience/ExperienceDurationDisplay";
import PageLoadingState from "./PageLoadingState";
import styles from "./ExperienceSection.module.css";

export default function ExperienceSection() {
  const [experienceData, setExperienceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadExperienceData() {
      try {
        const response = await fetch("/api/experience");

        if (!response.ok) {
          throw new Error("Failed to load experience data");
        }

        const data = await response.json();

        if (!cancelled) {
          setExperienceData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load experience data"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadExperienceData();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100dvh-5.5rem)] w-full items-center justify-center py-8">
        <PageLoadingState icon="briefcase" message="Loading experience data…" />
      </div>
    );
  }

  if (error || !experienceData) {
    return (
      <div className="flex min-h-[calc(100dvh-5.5rem)] w-full flex-col items-center justify-center gap-3 py-8 text-center">
        <div className={styles.statePanel} role="alert">
          <p className={styles.stateText}>
            {error || experienceData?.pageState?.errorText || "Experience data is unavailable."}
          </p>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => window.location.reload()}
          >
            {experienceData?.pageState?.retryLabel || "Try again"}
          </button>
        </div>
      </div>
    );
  }

  const { header, labels, companies } = experienceData;
  const allRoles = companies.flatMap((company) => company.roles);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeader} data-page-section>
        <div className={styles.headerPanel}>
          <div className={styles.headerGlow} aria-hidden="true" />
          <div className={styles.headerContent}>
            <div className={styles.headerIntro}>
              <h2 className={styles.careerTitle}>
                {header.titleBefore}
                <span className={styles.careerAccent}>{header.titleAccent}</span>
              </h2>
              <p className={styles.careerLead}>{header.lead}</p>
              <p className={styles.careerDescription}>{header.description}</p>
            </div>
            <div className={styles.careerStatsWrap}>
              <CareerDurationStats roles={allRoles} styles={styles} />
            </div>
          </div>
        </div>
      </div>

      {companies.map((company, index) => (
        <div key={company.id}>
          {index > 0 && <div className={styles.sectionDivider} />}
          <CompanyExperience company={company} skillsLabel={labels.skills} />
        </div>
      ))}
    </div>
  );
}
