import { CreatePostPopup } from "../../posts";

export default function AnnouncementManagementActions({
  canManageAnnouncements,
}) {
  if (!canManageAnnouncements) return null;

  return (
    <div className="container flex justify-end mx-auto mt-5 mb-10">
      <CreatePostPopup />
    </div>
  );
}
