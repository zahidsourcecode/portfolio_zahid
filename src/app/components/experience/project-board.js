import React from "react";
import styles from "./project-board.module.css";

const jobs = [
  {
    date: "20 May, 2023",
    company: "Amazon",
    title: "Senior UI/UX Designer",
    logo: "/amazon.png",
    tags: ["HTML", "Bootstrap", "ASP.NET MVC", "JavaScript", "jQuery", "WebAPI", "ADO.NET", "MS SQL", "Umbraco"],
    rate: "$250/hr",
    location: "San Francisco, CA",
    color: "#ffe5d0",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "4 Feb, 2023",
    company: "Google",
    title: "Junior UI/UX Designer",
    logo: "/google.png",
    tags: ["Full time", "Junior level", "Distant", "Project work", "Flexible Schedule"],
    rate: "$150/hr",
    location: "California, CA",
    color: "#d0f5e8",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "29 Jan, 2023",
    company: "Dribbble",
    title: "Senior Motion Designer",
    logo: "/dribbble.png",
    tags: ["Part time", "Senior level", "Full Day", "Shift work"],
    rate: "$260/hr",
    location: "New York, NY",
    color: "#e6e6fa",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "11 Apr, 2023",
    company: "Twitter",
    title: "UX Designer",
    logo: "/twitter.png",
    tags: ["Full time", "Middle level", "Distant", "Project work"],
    rate: "$120/hr",
    location: "California, CA",
    color: "#d0e7ff",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "2 Apr, 2023",
    company: "Airbnb",
    title: "Graphic Designer",
    logo: "/airbnb.png",
    tags: ["Part time", "Senior level"],
    rate: "$300/hr",
    location: "New York, NY",
    color: "#ffd0e7",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "18 Jan, 2023",
    company: "Apple",
    title: "Graphic Designer",
    logo: "/apple.png",
    tags: ["Part time", "Distant"],
    rate: "$140/hr",
    location: "San Francisco, CA",
    color: "#fff9d0",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "18 Jan, 2023",
    company: "Apple",
    title: "Graphic Designer",
    logo: "/apple.png",
    tags: ["Part time", "Distant"],
    rate: "$140/hr",
    location: "San Francisco, CA",
    color: "#ffe0f7",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "18 Jan, 2023",
    company: "Apple",
    title: "Graphic Designer",
    logo: "/apple.png",
    tags: ["Part time", "Distant"],
    rate: "$140/hr",
    location: "San Francisco, CA",
    color: "#d0fff9",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "18 Jan, 2023",
    company: "Apple",
    title: "Graphic Designer",
    logo: "/apple.png",
    tags: ["Part time", "Distant"],
    rate: "$140/hr",
    location: "San Francisco, CA",
    color: "#e3ffd0",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "18 Jan, 2023",
    company: "Apple",
    title: "Graphic Designer",
    logo: "/apple.png",
    tags: ["Part time", "Distant"],
    rate: "$140/hr",
    location: "San Francisco, CA",
    color: "#ffd6d0",
    projectLink: "https://www.youtube.com/",
  },
  {
    date: "18 Jan, 2023",
    company: "Apple",
    title: "Graphic Designer",
    logo: "/apple.png",
    tags: ["Part time", "Distant"],
    rate: "$140/hr",
    location: "San Francisco, CA",
    color: "#f9efd0",
    projectLink: "https://www.youtube1.com/",
  },
  {
    date: "18 Jan, 2023",
    company: "Apple",
    title: "Graphic Designer",
    logo: "/apple.png",
    tags: ["Part time", "Distant"],
    rate: "$140/hr",
    location: "San Francisco, CA",
    color: "#ecd0ff",
    projectLink: "https://www.youtube1.com/",
  }
];


export default function ProjectBoard() {
  return (
    <div>      
      <div className={styles.grid}>
        {jobs.map((job, idx) => (
          <div key={idx} className={styles.card} style={{ background: job.color }}>
            <div className={styles.cardHeader}>
              <span className={styles.date}>{job.date}</span>
              <span className={styles.bookmark}>
                <svg width="18" height="18" fill="none" stroke="#bbb" strokeWidth="2" viewBox="0 0 18 18">
                  <path d="M4 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13l-5-3-5 3V3z"/>
                </svg>
              </span>
            </div>
            <div className={styles.companyRow}>
              <span className={styles.companyName}>{job.company}</span>
              <img src={job.logo} alt={job.company} className={styles.logo} />
            </div>
            <div className={styles.title}>{job.title}</div>
            <div className={styles.tags}>
              {job.tags.map((tag, i) => (
                <span key={i} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.footer}>
              <span className={styles.rate}>{job.rate}</span>
              <span className={styles.location}>{job.location}</span>
         <a
  className={styles.detailsBtn}
  style={{ '--btn-hover-bg': job.color }}
  href={job.projectLink}
  target="_blank"
  rel="noopener noreferrer"
>
  Details
</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}