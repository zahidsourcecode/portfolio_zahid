import ExperienceSection from "../components/ExperienceSection";
import PageAutoScroll from "../components/PageAutoScroll";

export const dynamic = "force-dynamic";

export default function ExperiencePage() {
  return (
    <main className="page-gradient relative min-w-0 overflow-x-hidden pt-16 sm:pt-20 pb-8 sm:pb-12">
      <PageAutoScroll />
      <div className="relative mx-auto w-full min-w-0 max-w-5xl px-3 sm:px-4 md:px-6">
        <ExperienceSection />
      </div>
    </main>
  );
}
