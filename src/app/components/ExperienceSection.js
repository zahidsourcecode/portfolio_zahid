import Ixora from "../components/experience/ixora";
import NextIT from "../components/experience/nextit";
import Onair from "../components/experience/onair";
import styles from "./ExperienceSection.module.css"; // Create this CSS file

export default function Home() {
  return (    
    <div className={styles.cardWrapper}>
      <div className={styles.cardTitle} style={{ alignItems: 'center', gap: 16, marginBottom: 12 }}>
        <span style={{ fontWeight: 800, fontSize: '2.1rem', color: '#111', letterSpacing: 1 }}>Career</span>
        <span style={{         
          color: '#6666',         
          fontSize: '0.97rem',
          fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell, Droid Sans, Apple Color Emoji, Segoe UI Emoji, Segoe UI Emoji, Segoe UI Symbol, Lucida Grande, Helvetica, Arial, sans-serif',
          borderRadius: 16,          
          marginLeft: 4
        }}>
          (10 Years 6 months)
        </span>
      </div>
      <Ixora />
      <div className={styles.sectionDivider} />
      <NextIT />
      <div className={styles.sectionDivider} />
      <Onair />
    </div>
  );
}