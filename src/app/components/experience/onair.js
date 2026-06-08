"use client"
import React, { useState } from "react";
import styles from "./onair.module.css";

export default function Onair() {
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
        <a href="https://www.linkedin.com/company/onair-intl-ltd/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Onair Intl Ltd LinkedIn" >
          <img src="/onair-logo.png" alt="Onair Logo" className={styles.companyLogo} />
        </a>
        <div>
          <a
            href="https://www.linkedin.com/company/onair-intl-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.companyName}
            style={{ textDecoration: "none", color: "inherit" }}
            onMouseEnter={e => e.currentTarget.style.color = 'blue'}
            onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
          >
            Onair Intl Ltd
          </a>
          <div className={styles.employmentType}>Full-time · 1 yr 6 mos</div>

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
                href="https://www.google.com/maps/place/%E0%A6%AF%E0%A6%B6%E0%A7%8B%E0%A6%B0+%E0%A6%B8%E0%A6%AB%E0%A6%9F%E0%A6%93%E0%A7%9F%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B0+%E0%A6%9F%E0%A7%87%E0%A6%95%E0%A6%A8%E0%A7%8B%E0%A6%B2%E0%A6%9C%E0%A6%BF+%E0%A6%AA%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%95,+%E0%A6%AF%E0%A6%B6%E0%A7%8B%E0%A6%B0/@23.1560007,89.2219103,21z/data=!4m10!1m2!2m1!1ssheikh+hasina+it+park+jessore!3m6!1s0x39ff1045c66e238d:0x397efd1d68956163!8m2!3d23.1560007!4d89.222208!15sCh1zaGVpa2ggaGFzaW5hIGl0IHBhcmsgamVzc29yZVofIh1zaGVpa2ggaGFzaW5hIGl0IHBhcmsgamVzc29yZZIBEHNvZnR3YXJlX2NvbXBhbnmaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTlNlWEpFTjFOQkVBRaoBbwoNL2cvMTFncjFzY3Q3NxABKhkiFXNoZWlraCBoYXNpbmEgaXQgcGFyaygAMh4QASIaEUw-NxWgfJwYjRKGhxdcNmtz3aJKBEvKYhAyIRACIh1zaGVpa2ggaGFzaW5hIGl0IHBhcmsgamVzc29yZeABAPoBBQiIARBH!16s%2Fg%2F11fz9wvvh8?entry=ttu&g_ep=EgoyMDI1MDcwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.locationLink}
                style={{ cursor: 'pointer' }}
                onMouseEnter={handleAddressMouseEnter}
                onMouseLeave={handleAddressMouseLeave}
              >
                Jessore, Khulna, Bangladesh · On-site
              </a>
              {showPopup && (
                <span
                  className={styles.mapPopup}
                  onMouseEnter={handlePopupMouseEnter}
                  onMouseLeave={handlePopupMouseLeave}
                >
                  <iframe
                    title="Onair Location Map"
                    frameBorder="0"
                    src="https://www.google.com/maps?q=Jashore+Software+Technology+Park,+Jashore&output=embed"
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
          <div className={styles.jobTitle}>Software Engineer</div>
          <div className={styles.jobDuration}>Aug 2017 – Jun 2018 · 11 mos</div>
          <div className={styles.jobDesc}>
            I was fortunate to be promoted to Software Engineer during my time there, which was a testament to my growth and dedication. I worked deeply across various projects, gaining hands-on experience and building a solid foundation for my software development career.
          </div>
          <div className={styles.skillsRow}>
            <span className={styles.skillsLabel}>Skills:</span>
            <span className={styles.skillsList}>
              Data Structures · Algorithms · Object-Oriented Programming · Angular · TypeScript · ASP.NET MVC · Web API · Express.Js · Entity Framework · MongoDB · T-SQL
            </span>
          </div>
          <div className={styles.imageRow}>
            <img src="/it-park.png" alt="Jashore Software Technology Park" className={styles.teamImg} />
            <span className={styles.imageLabel}>Jashore IT Park, Jashore</span>
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineDot}></div>
        <div className={styles.timelineContent}>
          <div className={styles.jobTitle}>Junior Software Engineer </div>
          <div className={styles.jobDuration}>Jan 2017 – Aug 2017 · 8 mos</div>
          <div className={styles.jobDesc}>
            My first professional workplace, where I experienced the transition from student life to professional life and helped me grow both technically and personally.
          </div>
          <div className={styles.skillsRow}>
            <span className={styles.skillsLabel}>Skills:</span>
            <span className={styles.skillsList}>
              HTML · CSS · Bootstrap · JavaScript · ASP.NET · AngularJS · REST APIs · WebAPI · ADO.NET · SQL · Git
            </span>
          </div>
          <div className={styles.imageRow}>
            <img src="/onair-building.jpg" alt="Onair Intl Ltd" className={styles.teamImg} />
            <span className={styles.imageLabel}>Onair Intl Ltd</span>
          </div>
        </div>
      </div>
    </div>
  );
}