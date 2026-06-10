"use client";

import { ixoraRoles } from "../../data/experienceDates";
import {
  EmploymentTypeDisplay,
  ExperienceRangeDisplay,
} from "./ExperienceDurationDisplay";
import { MapPreview } from "./MapPreview";
import { useMapPopup } from "./useMapPopup";
import styles from "./experienceShared.module.css";

const seniorSkills = [
  "Data Structures", "Algorithms", "OOP", "SOLID", "Design Pattern", "Jira", "Azure",
  "ASP.NET MVC", "jQuery", "Angular", "React.js", "Next.JS", "TypeScript", "PrimeNG",
  "REST APIs", "Entity Framework", "EF Core", "Web API", "Express.js", "Node.js",
  "Project Management", "MS SQL", "PostgreSQL", "MongoDB", "Google Maps", "OSM",
];

const teamLeadSkills = [
  "Technical Leadership", "Team Mentoring", "ChatGPT", "Claude", "Cursor", "Gemini",
  "AI-Assisted Development", "Code Review", "Architecture", "Agile",
];

export default function Ixora() {
  const { showPopup, linkHandlers, popupHandlers, close } = useMapPopup();

  return (
    <div className={styles.timelineCard}>
      <div className={styles.headerRow}>
        <a
          href="https://ixorasolution.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="iXora Solution Ltd."
        >
          <img src="/ixora-logo.png" alt="Ixora Logo" className={styles.companyLogo} />
        </a>
        <div className={styles.headerInfo}>
          <a
            href="https://ixorasolution.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.companyName}
          >
            iXora Solution Ltd.
          </a>
          <div className={styles.employmentType}>
            <EmploymentTypeDisplay roles={ixoraRoles} />
          </div>
          <div className={styles.location}>
            <span className={styles.mapIcon} aria-label="Map">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.mapPinIcon} xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15s6-5.686 6-9.5A6 6 0 1 0 2 5.5C2 9.314 8 15 8 15Z" stroke="#5ebed5" strokeWidth="1.2" fill="none" />
                <circle cx="8" cy="6" r="2" fill="#5ebed5" />
              </svg>
            </span>
            <span className={styles.locationInner}>
              <a
                href="https://www.google.com/maps?sca_esv=6d2e1bcb61b00bbd&output=search&q=ixora+solution&source=lnms&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIetxLMeWi1u_d0OMRvkClUbalBeyXa8ssyRd_VUj5FQB2aTtVSqS-8espAxkq1fZ3U9sIRL69zKeuDirhjMa-1E_d5o-j4SRKpcxWLkUePm2sYa7NcDbS4r7P9cWLlu6mtGTKoxS2uSejvODUwNxfsq0WBtF4Pw8Ysv53cPXg4POw7-yVTA&entry=mc&ved=1t:200715&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.locationLink}
                {...linkHandlers}
              >
                7th Floor, House: M5, Jahangir Tower, Mirpur: 14, Dhaka · Hybrid
              </a>
              <MapPreview
                show={showPopup}
                title="Ixora Location Map"
                src="https://www.google.com/maps?q=House+M5+Section+14+Jahangir+Tower+7th+Floor+Mirpur+Dhaka&output=embed"
                popupHandlers={popupHandlers}
                onClose={close}
              />
            </span>
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineDotWhite}></div>
        <div className={styles.timelineContent}>
          <div className={styles.jobTitle}>Technical Team Lead</div>
          <div className={styles.jobDuration}>
            <ExperienceRangeDisplay start={ixoraRoles[0].start} end={ixoraRoles[0].end} />
          </div>
          <div className={styles.jobDesc}>
            <ul className={styles.bulletList}>
              <li>Promoted to lead the technical team, guiding architecture decisions and delivery.</li>
              <li>Mentor developers and coordinate tasks across ongoing ERP and web projects.</li>
              <li>Use AI tools such as ChatGPT, Claude, Cursor, and Gemini to speed up development and improve code quality.</li>
            </ul>
          </div>
          <div className={styles.skillsRow}>
            <span className={styles.skillsLabel}>Skills:</span>
            <span className={styles.skillsList}>
              {teamLeadSkills.join(" · ")}
            </span>
          </div>
          <div className={styles.imageRow}>
            <div className={styles.imageItem}>
              <img src="/ixora-team-lead-awards.png" alt="Promotion awards celebration at iXora" className={styles.teamImg} tabIndex={0} />
              <span className={styles.imageLabel}>Promotion awards</span>
            </div>
            <div className={styles.imageItem}>
              <img src="/ixora-promotion-gift.png" alt="Receiving promotion gift at iXora" className={styles.teamImg} tabIndex={0} />
              <span className={styles.imageLabel}>Promotion gift</span>
            </div>
            <div className={styles.imageItem}>
              <img src="/ixora-team-lead-office.png" alt="Technical Team Lead at iXora office" className={styles.teamImg} tabIndex={0} />
              <span className={styles.imageLabel}>Office moments</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineDot}></div>
        <div className={styles.timelineContent}>
          <div className={styles.jobTitle}>Senior Software Engineer</div>
          <div className={styles.jobDuration}>
            <ExperienceRangeDisplay start={ixoraRoles[1].start} end={ixoraRoles[1].end} />
          </div>
          <div className={styles.jobDesc}>
            <ul className={styles.bulletList}>
              <li>As Lead Engineer, built ERP solutions serving 5,000+ users.</li>
              <li>Optimized SQL queries to improve load performance</li>
              <li>Collaborate with juniors and directly handle client requirements</li>
              <li>Flexible working time and friendly working environment</li>
              <li>Recreational facilities like as table tennis, annual family tours</li>
            </ul>
          </div>
          <div className={styles.skillsRow}>
            <span className={styles.skillsLabel}>Skills:</span>
            <span className={styles.skillsList}>
              {seniorSkills.join(" · ")}
            </span>
          </div>
          <div className={styles.imageRow}>
            <div className={styles.imageItem}>
              <img src="/tt-champion.jpg" alt="Table Tennis Champion" className={styles.teamImg} tabIndex={0} />
              <span className={styles.imageLabel}>Table tennis champion</span>
            </div>
            <div className={styles.imageItem}>
              <img src="/new-office.jpg" alt="New Office" className={styles.teamImg} tabIndex={0} />
              <span className={styles.imageLabel}>Office inauguration</span>
            </div>
            <div className={styles.imageItem}>
              <img src="/my-desk.jpg" alt="My Desk" className={styles.teamImg} tabIndex={0} />
              <span className={styles.imageLabel}>My desk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}