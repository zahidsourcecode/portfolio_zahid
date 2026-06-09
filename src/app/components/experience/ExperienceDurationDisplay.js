"use client";

import { useEffect, useState } from "react";
import {
  formatEmploymentType,
  formatExperienceRange,
  getCareerDurationParts,
} from "../../utils/experienceDuration";

function useLiveDurationText(calculate, deps) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(calculate(new Date()));
  }, deps);

  return text;
}

export function ExperienceRangeDisplay({ start, end }) {
  const text = useLiveDurationText(
    (now) => formatExperienceRange(start, end, now),
    [start, end],
  );

  return <span suppressHydrationWarning>{text}</span>;
}

export function EmploymentTypeDisplay({ roles, employmentType = "Full-time" }) {
  const text = useLiveDurationText(
    (now) => formatEmploymentType(roles, employmentType, now),
    [roles, employmentType],
  );

  return <span suppressHydrationWarning>{text}</span>;
}

export function CareerDurationStats({ roles, styles }) {
  const [parts, setParts] = useState(null);

  useEffect(() => {
    setParts(getCareerDurationParts(roles, "Present", new Date()));
  }, [roles]);

  if (!parts) {
    return (
      <div className={styles.statsGrid} aria-hidden="true">
        <div className={styles.statBox}>
          <span className={styles.statValue}>&nbsp;</span>
          <span className={styles.statLabel}>&nbsp;</span>
        </div>
      </div>
    );
  }

  const yearLabel = parts.years === 1 ? "Year" : "Years";
  const monthLabel = parts.months === 1 ? "Month" : "Months";

  return (
    <div className={styles.statsGrid} suppressHydrationWarning>
      {parts.years > 0 && (
        <div className={styles.statBox}>
          <span className={styles.statValue}>{parts.years}</span>
          <span className={styles.statLabel}>{yearLabel}</span>
        </div>
      )}
      {parts.months > 0 && (
        <div className={styles.statBox}>
          <span className={styles.statValue}>{parts.months}</span>
          <span className={styles.statLabel}>{monthLabel}</span>
        </div>
      )}
      {parts.years === 0 && parts.months === 0 && (
        <div className={styles.statBox}>
          <span className={styles.statValue}>0</span>
          <span className={styles.statLabel}>Months</span>
        </div>
      )}
    </div>
  );
}
