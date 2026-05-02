"use client"
import styles from "./topBar.module.css";
import Link from 'next/link';

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.logoSection}>
        <img src="/project-icon.png" alt="techtown" className={styles.logo} />
        <span className={styles.brand}>Project List</span>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          home
        </Link>
        <Link href="/company" className={styles.active}>
          company
        </Link>
        <Link href="/users" className={styles.link}>
          users
        </Link>
        <Link href="/settings" className={styles.link}>
          settings
        </Link>
      </nav>
      <div className={styles.rightSection}>
        <span className={styles.bell}>
          <svg width="22" height="22" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 22 22">
            <path d="M11 21a2 2 0 0 0 2-2H9a2 2 0 0 0 2 2zm6-5V9a6 6 0 1 0-12 0v7l-2 2v1h16v-1l-2-2z" />
          </svg>
        </span>
        <div className={styles.profile}>
          <img src="/avatar.jpg" alt="Profile" className={styles.avatar} />
          <div>
            <div className={styles.name}>Md. Zahid</div>
            <div className={styles.role}>Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}