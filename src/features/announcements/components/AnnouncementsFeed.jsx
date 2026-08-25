import { PostLayout } from "../../posts";

export default function AnnouncementsFeed({ announcements }) {
  return <PostLayout data={announcements} label="ANNOUNCEMENT" />;
}
