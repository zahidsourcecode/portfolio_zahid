import Ixora from "../components/experience/ixora";
import NextIT from "../components/experience/nextit";
import Onair from "../components/experience/onair";
import styles from "./ExperienceSection.module.css"; // Create this CSS file

export default function Home() {
  return (    
    <div className={styles.cardWrapper}>
      <div className={`${styles.cardTitle} flex items-center gap-3 sm:gap-4 mb-3`}>
        <span className={styles.careerTitle}>Career</span>
        <span className={styles.careerDuration}>(10 Years 6 months)</span>
      </div>
      <Ixora />
      <div className={styles.sectionDivider} />
      <NextIT />
      <div className={styles.sectionDivider} />
      <Onair />
    </div>
  );
}