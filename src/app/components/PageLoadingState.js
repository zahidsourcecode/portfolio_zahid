"use client";

import {
  BookOpen,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Home,
  Layers,
  MessageSquare,
  UserRound,
} from "lucide-react";
import styles from "./PageLoadingState.module.css";

const PAGE_LOADING_ICONS = {
  home: Home,
  briefcase: Briefcase,
  layers: Layers,
  folderKanban: FolderKanban,
  bookOpen: BookOpen,
  graduationCap: GraduationCap,
  messageSquare: MessageSquare,
  userRound: UserRound,
};

export default function PageLoadingState({ icon = "home", message, className = "" }) {
  const Icon = PAGE_LOADING_ICONS[icon] || Home;

  return (
    <div className={`${styles.pageLoadingPanel} ${className}`.trim()} role="status" aria-live="polite">
      <Icon size={28} className={styles.pageLoadingIcon} strokeWidth={2} aria-hidden />
      <p className={styles.pageLoadingText}>{message}</p>
    </div>
  );
}
