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

function plural(value, singular, pluralLabel) {
  return value === 1 ? singular : pluralLabel;
}

function formatStatValue(value, padded = false) {
  return padded ? String(value).padStart(2, "0") : String(value);
}

function StatUnit({
  value,
  label,
  boxClass,
  valueClass,
  labelClass,
  padded = false,
  tick = false,
}) {
  return (
    <div className={boxClass}>
      <span className={valueClass} key={tick ? value : undefined}>
        {formatStatValue(value, padded)}
      </span>
      <span className={labelClass}>{label}</span>
    </div>
  );
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
    const update = () => {
      setParts(getCareerDurationParts(roles, "Present", new Date()));
    };

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, [roles]);

  if (!parts) {
    return (
      <div className={styles.statsPanel} aria-hidden="true">
        <div className={styles.statsPrimaryRow}>
          <div className={styles.statBox}>
            <span className={styles.statValue}>&nbsp;</span>
            <span className={styles.statLabel}>&nbsp;</span>
          </div>
        </div>
      </div>
    );
  }

  const primaryUnits = [
    { value: parts.years, label: plural(parts.years, "Year", "Years") },
    { value: parts.months, label: plural(parts.months, "Month", "Months") },
    { value: parts.days, label: plural(parts.days, "Day", "Days") },
  ];

  const secondaryUnits = [
    { value: parts.hours, label: plural(parts.hours, "Hour", "Hours") },
    { value: parts.minutes, label: plural(parts.minutes, "Minute", "Minutes") },
    { value: parts.seconds, label: plural(parts.seconds, "Second", "Seconds") },
  ];

  return (
    <div className={styles.statsPanel} suppressHydrationWarning>
      <div className={styles.statsPrimaryRow}>
        {primaryUnits.map(({ value, label }) => (
          <StatUnit
            key={label}
            value={value}
            label={label}
            boxClass={styles.statBox}
            valueClass={styles.statValue}
            labelClass={styles.statLabel}
          />
        ))}
      </div>

      <div className={styles.statsDivider} aria-hidden="true">
        <span className={styles.statsDividerLine} />
        <span className={styles.statsDividerLive}>
          <span className={styles.statsDividerDot} />
          <span className={styles.statsDividerLabel}>Live</span>
        </span>
        <span className={styles.statsDividerLine} />
      </div>

      <div className={styles.statsSecondaryRow}>
        {secondaryUnits.map(({ value, label }) => (
          <StatUnit
            key={label}
            value={value}
            label={label}
            boxClass={styles.statBoxSmall}
            valueClass={
              label.startsWith("Second")
                ? `${styles.statValueSmall} ${styles.statValueTick}`
                : styles.statValueSmall
            }
            labelClass={styles.statLabelSmall}
            padded
            tick={label.startsWith("Second")}
          />
        ))}
      </div>
    </div>
  );
}
