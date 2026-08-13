import AnnouncementHeader from "../components/AnnouncementHeader";
import AnnouncementManagementActions from "../components/AnnouncementManagementActions";
import AnnouncementsFeed from "../components/AnnouncementsFeed";
import useAnnouncementsPage from "../hooks/useAnnouncementsPage";

export default function AnnouncementsPage() {
  const { announcements, canManageAnnouncements } = useAnnouncementsPage();

  return (
    <>
      <AnnouncementHeader />
      <AnnouncementManagementActions
        canManageAnnouncements={canManageAnnouncements}
      />
      <AnnouncementsFeed announcements={announcements} />
    </>
  );
}
