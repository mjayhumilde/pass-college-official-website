import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScrollToPost } from "../../../hook/useScrollPost";
import useAuthStore from "../../../store/useAuthStore";
import usePostStore from "../../../store/usePostStore";
import NewsEventsHero from "../components/NewsEventsHero";
import NewsEventsNewsletterSection from "../components/NewsEventsNewsletterSection";
import NewsSection from "../components/NewsSection";
import SectionEventLayout from "../components/SectionEventLayout";

const NEWS_EVENTS_MANAGER_ROLES = ["admin", "registrar"];

export default function NewsEventsPage() {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const news = usePostStore((state) => state.news);
  const events = usePostStore((state) => state.events);
  const getAllPost = usePostStore((state) => state.getAllPost);
  const canManagePosts =
    isAuthenticated && NEWS_EVENTS_MANAGER_ROLES.includes(userRole);

  useScrollToPost();

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const timer = setTimeout(() => {
      const element = document.querySelector(location.hash);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <main>
      <NewsEventsHero />
      <SectionEventLayout data={events} label="EVENTS" />
      <NewsSection canManagePosts={canManagePosts} news={news} />
      <NewsEventsNewsletterSection />
    </main>
  );
}
