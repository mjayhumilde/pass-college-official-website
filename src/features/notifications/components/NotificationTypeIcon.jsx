import {
  Bell,
  Briefcase,
  Calendar,
  FileCheck,
  Megaphone,
  Newspaper,
} from "lucide-react";

export default function NotificationTypeIcon({ postType }) {
  const iconProps = { className: "text-red-800", size: 20 };

  switch (postType) {
    case "announcement":
    case "uniforms-update":
      return <Megaphone {...iconProps} />;
    case "careers":
      return <Briefcase {...iconProps} />;
    case "news":
      return <Newspaper {...iconProps} />;
    case "events":
      return <Calendar {...iconProps} />;
    case "document":
      return <FileCheck {...iconProps} />;
    default:
      return <Bell {...iconProps} />;
  }
}
