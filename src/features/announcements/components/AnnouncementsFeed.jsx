import PostLayout from "../../../components/PostLayout";

export default function AnnouncementsFeed({ announcements }) {
  return <PostLayout data={announcements} label="ANNOUNCEMENT" />;
}
