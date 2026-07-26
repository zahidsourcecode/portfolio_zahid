"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, ExternalLink, Eye, GraduationCap } from "lucide-react";
import PageAutoScroll from "../components/PageAutoScroll";
import PageLoadingState from "../components/PageLoadingState";
import ExperienceLetterModal from "../components/experience/ExperienceLetterModal";
import expStyles from "../components/experience/experienceShared.module.css";
import styles from "./schooling.module.css";

function InstitutionLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.institutionLink}
    >
      {children}
      <ExternalLink size={13} className={styles.institutionIcon} aria-hidden />
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

function CertificateViewButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.certViewBtn}
      aria-label={`View ${label}`}
      title={`View ${label}`}
    >
      <Eye size={16} aria-hidden />
    </button>
  );
}

export default function SchoolingPage() {
  const [schoolingData, setSchoolingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSchoolingData() {
      try {
        const response = await fetch("/api/schooling");

        if (!response.ok) {
          throw new Error("Failed to load schooling data");
        }

        const data = await response.json();

        if (!cancelled) {
          setSchoolingData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load schooling data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSchoolingData();

    return () => {
      cancelled = true;
    };
  }, []);

  const openCertificate = ({ certificate, certificateLabel, degree, imageScale }) => {
    const extension = certificate.split(".").pop()?.toLowerCase() || "png";
    setActiveCertificate({
      src: certificate,
      title: certificateLabel,
      downloadName: `${degree.replace(/[^a-zA-Z0-9]+/g, "_")}_certificate.${extension}`,
      imageScale,
    });
  };

  if (loading) {
    return (
      <main className="page-gradient flex min-h-screen min-w-0 items-center justify-center overflow-x-hidden px-3 py-6 pb-4 pt-16 sm:px-6 sm:pt-20">
        <PageLoadingState icon="graduationCap" message="Loading schooling data…" />
      </main>
    );
  }

  if (error || !schoolingData) {
    return (
      <main className="page-gradient flex min-h-screen min-w-0 items-center justify-center overflow-x-hidden px-3 py-6 pb-4 pt-16 sm:px-6 sm:pt-20">
        <div className={styles.statePanel} role="alert">
          <p className={styles.stateText}>{error || "Schooling data is unavailable."}</p>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const { hero, professionalCertification, academicBackground, footer } = schoolingData;
  const { microsoftCert } = professionalCertification;
  const { education, tableHeaders } = academicBackground;

  return (
    <main className={`page-gradient !min-h-0 min-w-0 overflow-x-hidden ${styles.page}`}>
      <PageAutoScroll />
      <div className={styles.inner}>
        <article className={styles.sheet}>
          <header className={styles.hero} data-page-section>
            <div className="mb-2 flex items-center gap-2">
              <GraduationCap size={22} className="text-brand" strokeWidth={2.1} />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark dark:text-brand">
                {hero.eyebrow}
              </span>
            </div>
            <h1 className={styles.title}>{hero.title}</h1>
            <p className={styles.summary}>{hero.summary}</p>
          </header>

          <div className={styles.body}>
            <section className={styles.certSection} aria-labelledby="cert-heading">
              <h2 id="cert-heading" className={styles.sectionTitle}>
                {professionalCertification.sectionTitle}
              </h2>
              <article className={styles.certCard}>
                <div className={styles.certMain}>
                  <div className={styles.certHeader}>
                    <span className={styles.certIssuer}>
                      <Award size={16} aria-hidden />
                      {professionalCertification.issuerLabel}
                    </span>
                    <span className={styles.certStatus}>{microsoftCert.status}</span>
                  </div>
                  <h3 className={styles.certTitle}>{microsoftCert.title}</h3>
                  <p className={styles.certExam}>
                    Exam {microsoftCert.exam} — {microsoftCert.examLabel}
                  </p>
                  <dl className={styles.certMeta}>
                    <div className={styles.certMetaItem}>
                      <dt>Score</dt>
                      <dd>
                        {microsoftCert.score}{" "}
                        <span className={styles.certMetaMuted}>
                          / {microsoftCert.passingScore} required
                        </span>
                      </dd>
                    </div>
                    <div className={styles.certMetaItem}>
                      <dt>Date</dt>
                      <dd>{microsoftCert.date}</dd>
                    </div>
                  </dl>
                  <a
                    href={microsoftCert.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.credlyLink}
                  >
                    {professionalCertification.credlyLinkLabel}
                    <ExternalLink size={14} aria-hidden />
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </div>
                <figure className={styles.certFigure}>
                  <div className={expStyles.imageItem}>
                    <img
                      src={microsoftCert.reportImage}
                      alt={microsoftCert.reportImageAlt}
                      className={`${expStyles.teamImg} ${styles.certReportImg}`}
                      tabIndex={0}
                    />
                  </div>
                  <figcaption className={styles.certCaption}>
                    {professionalCertification.reportCaption}
                  </figcaption>
                </figure>
              </article>
            </section>

            <h2 className={`${styles.sectionTitle} ${styles.academicTitle}`}>
              {academicBackground.sectionTitle}
            </h2>

            <div className={styles.timeline}>
              {education.map(
                ({
                  id,
                  degree,
                  major,
                  institution,
                  website,
                  year,
                  cgpa,
                  cgpaMax,
                  certificate,
                  certificateLabel,
                  imageScale,
                }) => (
                  <article key={id} className={styles.card}>
                    <div className={styles.cardTop} aria-hidden />
                    <div className={styles.cardHead}>
                      <div>
                        <h3 className={styles.degree}>{degree}</h3>
                        <p className={styles.major}>{major}</p>
                      </div>
                      <span className={styles.year}>{year}</span>
                    </div>
                    <p className={styles.institution}>
                      <InstitutionLink href={website}>{institution}</InstitutionLink>
                    </p>
                    <div className={styles.metaRow}>
                      <span className={styles.cgpaBadge}>
                        CGPA {cgpa} / {cgpaMax}
                      </span>
                      <span className={styles.cgpaLabel}>{academicBackground.cgpaLabel}</span>
                      <div className={styles.certMobile}>
                        <span className={styles.certMobileLabel}>
                          {academicBackground.certificateColumnLabel}
                        </span>
                        <CertificateViewButton
                          label={certificateLabel}
                          onClick={() =>
                            openCertificate({
                              certificate,
                              certificateLabel,
                              degree,
                              imageScale,
                            })
                          }
                        />
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">{tableHeaders.degree}</th>
                    <th scope="col">{tableHeaders.major}</th>
                    <th scope="col">{tableHeaders.institution}</th>
                    <th scope="col">{tableHeaders.year}</th>
                    <th scope="col">{tableHeaders.cgpa}</th>
                    <th scope="col">{tableHeaders.certificate}</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map(
                    ({
                      id,
                      degree,
                      major,
                      institution,
                      website,
                      year,
                      cgpa,
                      cgpaMax,
                      certificate,
                      certificateLabel,
                      imageScale,
                    }) => (
                      <tr key={id}>
                        <td className={styles.tableDegree}>{degree}</td>
                        <td>{major}</td>
                        <td>
                          <InstitutionLink href={website}>{institution}</InstitutionLink>
                        </td>
                        <td>{year}</td>
                        <td className={styles.tableCgpa}>
                          {cgpa} / {cgpaMax}
                        </td>
                        <td className={styles.tableCert}>
                          <CertificateViewButton
                            label={certificateLabel}
                            onClick={() =>
                              openCertificate({
                              certificate,
                              certificateLabel,
                              degree,
                              imageScale,
                            })
                            }
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <footer className={styles.footer}>
            <p className={styles.footerText}>{footer.text}</p>
            <div className={styles.footerActions}>
              {footer.links.map(({ href, label, variant }) =>
                variant === "primary" ? (
                  <Link key={href} href={href} className={styles.primaryLink}>
                    {label}
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                ) : (
                  <Link key={href} href={href} className={styles.secondaryLink}>
                    {label}
                  </Link>
                )
              )}
            </div>
          </footer>
        </article>
      </div>

      <ExperienceLetterModal
        open={Boolean(activeCertificate)}
        onClose={() => setActiveCertificate(null)}
        image={activeCertificate?.src}
        imageAlt={activeCertificate?.title}
        title={activeCertificate?.title}
        imageScale={activeCertificate?.imageScale}
        downloadHref={activeCertificate?.src}
        downloadName={activeCertificate?.downloadName}
      />
    </main>
  );
}
