"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import {
  EmploymentTypeDisplay,
  ExperienceRangeDisplay,
} from "./ExperienceDurationDisplay";
import ExperienceLetterModal from "./ExperienceLetterModal";
import { MapPreview } from "./MapPreview";
import { useMapPopup } from "./useMapPopup";
import styles from "./experienceShared.module.css";

function MapPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={styles.mapPinIcon}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 15s6-5.686 6-9.5A6 6 0 1 0 2 5.5C2 9.314 8 15 8 15Z"
        stroke="#5ebed5"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="8" cy="6" r="2" fill="#5ebed5" />
    </svg>
  );
}

function JobDescription({ description }) {
  if (!description) return null;

  if (description.type === "bullets") {
    return (
      <div className={styles.jobDesc}>
        <ul className={styles.bulletList}>
          {description.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <div className={styles.jobDesc}>{description.content}</div>;
}

export default function CompanyExperience({ company, skillsLabel }) {
  const { showPopup, linkHandlers, popupHandlers, close } = useMapPopup();
  const [showExperienceLetter, setShowExperienceLetter] = useState(false);
  const { experienceLetter } = company;

  return (
    <div className={styles.timelineCard}>
      <div className={styles.headerRow}>
        <a
          href={company.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={company.linkAriaLabel}
        >
          <img src={company.logo} alt={company.logoAlt} className={styles.companyLogo} />
        </a>
        <div className={styles.headerInfo}>
          <a
            href={company.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.companyName}
          >
            {company.name}
          </a>
          <div className={styles.employmentType}>
            <EmploymentTypeDisplay
              roles={company.roles}
              employmentType={company.employmentType}
            />
          </div>
          <div className={styles.location}>
            <span className={styles.mapIcon} aria-label="Map">
              <MapPinIcon />
            </span>
            <span className={styles.locationInner}>
              <a
                href={company.location.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.locationLink}
                {...linkHandlers}
              >
                {company.location.text}
              </a>
              <MapPreview
                show={showPopup}
                title={company.location.mapTitle}
                src={company.location.mapEmbedSrc}
                popupHandlers={popupHandlers}
                onClose={close}
              />
            </span>
          </div>
        </div>

        {experienceLetter && (
          <button
            type="button"
            className={styles.experienceLetterBtn}
            onClick={() => setShowExperienceLetter(true)}
            aria-label={`View ${experienceLetter.label}`}
          >
            <FileText size={16} strokeWidth={2.1} aria-hidden />
            <span>{experienceLetter.label}</span>
          </button>
        )}
      </div>

      {company.positions.map((position) => {
        const role = company.roles[position.roleIndex];

        return (
          <div key={`${company.id}-${position.title}`} className={styles.timeline}>
            <div
              className={
                position.dotVariant === "white"
                  ? styles.timelineDotWhite
                  : styles.timelineDot
              }
            />
            <div className={styles.timelineContent}>
              <div className={styles.jobTitle}>{position.title}</div>
              <div className={styles.jobDuration}>
                <ExperienceRangeDisplay start={role.start} end={role.end} />
              </div>
              <JobDescription description={position.description} />
              {position.skills?.length > 0 && (
                <div className={styles.skillsRow}>
                  <span className={styles.skillsLabel}>{skillsLabel}</span>
                  <span className={styles.skillsList}>{position.skills.join(" · ")}</span>
                </div>
              )}
              {position.images?.length > 0 && (
                <div className={styles.imageRow}>
                  {position.images.map((image) => (
                    <div key={image.src} className={styles.imageItem}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={styles.teamImg}
                        tabIndex={0}
                      />
                      <span className={styles.imageLabel}>{image.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {experienceLetter && (
        <ExperienceLetterModal
          open={showExperienceLetter}
          onClose={() => setShowExperienceLetter(false)}
          image={experienceLetter.image}
          imageAlt={experienceLetter.imageAlt}
          title={experienceLetter.modalTitle || experienceLetter.label}
          imageScale={experienceLetter.imageScale}
          downloadHref={experienceLetter.image}
          downloadName={experienceLetter.image.split("/").pop()}
        />
      )}
    </div>
  );
}
