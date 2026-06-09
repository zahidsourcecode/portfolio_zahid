import Ixora from "../components/experience/ixora";
import NextIT from "../components/experience/nextit";
import Onair from "../components/experience/onair";
import { CareerDurationStats } from "../components/experience/ExperienceDurationDisplay";
import { allExperienceRoles } from "../data/experienceDates";
import styles from "./ExperienceSection.module.css";

export default function ExperienceSection() {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeader} data-page-section>
        <div className={styles.headerPanel}>
          <div className={styles.headerGlow} aria-hidden="true" />
          <div className={styles.headerContent}>
            <div className={styles.headerIntro}>
              <h2 className={styles.careerTitle}>
                My <span className={styles.careerAccent}>Career</span>
              </h2>
              <p className={styles.careerSubtitle}>
                Junior to team lead · ERP, web & AI-assisted development
              </p>
            </div>
            <div className={styles.careerStatsWrap}>
              <span className={styles.statsCaption}>Total experience</span>
              <CareerDurationStats roles={allExperienceRoles} styles={styles} />
            </div>
          </div>
        </div>
      </div>
      <Ixora />
      <div className={styles.sectionDivider} />
      <NextIT />
      <div className={styles.sectionDivider} />
      <Onair />
    </div>
  );
}
