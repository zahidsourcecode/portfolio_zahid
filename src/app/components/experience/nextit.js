"use client"
import React, { useState } from "react";
import styles from "./nextit.module.css";

export default function NextIT() {
  const [showPopup, setShowPopup] = useState(false);
  let popupHideTimeout = null;

  const handleAddressMouseEnter = () => {
    if (popupHideTimeout) clearTimeout(popupHideTimeout);
    setShowPopup(true);
  };
  const handleAddressMouseLeave = () => {
    popupHideTimeout = setTimeout(() => setShowPopup(false), 120);
  };
  const handlePopupMouseEnter = () => {
    if (popupHideTimeout) clearTimeout(popupHideTimeout);
    setShowPopup(true);
  };
  const handlePopupMouseLeave = () => {
    popupHideTimeout = setTimeout(() => setShowPopup(false), 120);
  };

  return (
    <div className={styles.timelineCard}>
      <div className={styles.headerRow}>
        <div>
          <a
            href="https://nextitltd.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.companyName}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src="/nextit-logo.png" alt="Next IT Logo" className={styles.companyLogo} />
          </a>
        </div>
        <div>
          <a
            href="https://nextitltd.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.companyName}
            style={{ textDecoration: "none", color: "inherit" }}
            onMouseEnter={e => e.currentTarget.style.color = 'blue'}
            onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
          >
            Next IT Ltd
          </a>
          <div className={styles.employmentType}>Full-time · 3 yrs 4 mos</div>
          <div className={styles.location} style={{ position: 'relative', display: 'inline-block' }}>
            <span className={styles.mapIcon} aria-label="Map">
              {/* SVG Map Pin Icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ verticalAlign: 'middle', marginRight: 6 }} xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15s6-5.686 6-9.5A6 6 0 1 0 2 5.5C2 9.314 8 15 8 15Z" stroke="#b8002e" strokeWidth="1.2" fill="none" />
                <circle cx="8" cy="6" r="2" fill="#b8002e" />
              </svg>
            </span>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <a
                href="https://www.google.com/maps/place/NEXT+IT+Limited/@23.7788417,90.4107744,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c70d6fa35e53:0xc59bb05242b3b0ea!8m2!3d23.7788417!4d90.4133493!16s%2Fg%2F1q5blm4cg?entry=ttu&g_ep=EgoyMDI1MDcwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.locationLink}
                style={{ cursor: 'pointer' }}
                onMouseEnter={handleAddressMouseEnter}
                onMouseLeave={handleAddressMouseLeave}
              >
                Apartment- A2 & A3, House- 03, Rd 13, Gulshan, Dhaka · On-site
              </a>
              {showPopup && (
                <span
                  className={styles.mapPopup}
                  onMouseEnter={handlePopupMouseEnter}
                  onMouseLeave={handlePopupMouseLeave}
                >
                  <iframe
                    title="Next IT Location Map"
                    frameBorder="0"
                    src="https://www.google.com/maps?q=NEXT+IT+Limited&output=embed"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineDot}></div>
        <div className={styles.timelineContent}>
          <div className={styles.jobTitle}>Senior Software Engineer</div>
          <div className={styles.jobDuration}>Jan 2021 – Oct 2021 · 10 mos</div>
          <div className={styles.jobDesc}>
            It was my first exposure to a large-scale ERP system and a complex business domain. I closely followed the full Software Development Life Cycle (SDLC) and participated in well-defined QA processes. The collaborative and supportive nature of my colleagues played a key role in my development, and I’m truly grateful for the experience.
          </div>
          <div className={styles.skillsRow}>
            <span className={styles.skillsLabel}>Skills:</span>
            <span className={styles.skillsList}>
              SOLID · DDD · OOP · Agile · N-Tire · HTTP Status Code · Angular · TypeScript · PrimeNG · ASP.NET MVC · Crystal Reports · TFS
            </span>
          </div>
          <div className={styles.imageRow}>
            <img src="/nextit-team.jpeg" alt="Next IT Award" className={styles.teamImg} />
            <span className={styles.imageLabel}>Next IT Award</span>
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineDot}></div>
        <div className={styles.timelineContent}>
          <div className={styles.jobTitle}>Software Engineer</div>
          <div className={styles.jobDuration}>Jul 2018 – Dec 2020 · 2 yrs 6 mos</div>
          <div className={styles.skillsRow}>
            <span className={styles.skillsLabel}>Skills:</span>
            <span className={styles.skillsList}>
              AngularJS · Software Development Life Cycle · Jira · GitHub · ASP.NET MVC · Web API · SQL Server
            </span>
          </div>
          <div className={styles.imageRow}>
            <img src="/office-space.jpeg" alt="Office Space" className={styles.teamImg} />
            <span className={styles.imageLabel}>Office Space</span>
          </div>
        </div>
      </div>
    </div>
  );
}