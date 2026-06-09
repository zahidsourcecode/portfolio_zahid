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
              <p className={styles.careerLead}>
                Junior to team lead · ERP, web & AI-assisted development
              </p>
              <p className={styles.careerDescription}>
                Over nine years I have built ERP, accounting, POS, and e-commerce solutions
                with .NET, Angular, React, and Node.js. Today I lead teams, mentor
                developers, and use AI-assisted tools to deliver reliable software at scale.
              </p>
            </div>
            <div className={styles.careerStatsWrap}>
              <div className={styles.statsCaptionWrap}>
                <span className={styles.statsCaptionAccent} aria-hidden="true" />
                <span className={styles.statsCaption}>Total experience</span>
              </div>
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
