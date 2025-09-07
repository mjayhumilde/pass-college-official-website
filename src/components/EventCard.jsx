import useAuthStore from "../store/useAuthStore";
import DeleteIcon from "./DeleteIcon";
import EditComponent from "./EditIcon";

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:5000";

function toImageUrl(path) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
}

// Format using Asia/Manila so dates are correct for you
function getDateParts(iso) {
  if (!iso) return { month: "", day: "" };
  const d = new Date(iso);
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "Asia/Manila",
  }).format(d); // e.g., "Sep"
  const day = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    timeZone: "Asia/Manila",
  }).format(d); // e.g., "23"
  return { month, day };
}

const EventCard = ({ event }) => {
  const userRole = useAuthStore((s) => s.userRole);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const cover =
    Array.isArray(event?.images) && event.images.length
      ? toImageUrl(event.images[0])
      : null;

  // Use eventDate for the calendar panel
  const { month, day } = getDateParts(event?.eventDate);

  return (
    <div className="flex flex-col w-full bg-white">
      <div
        className="w-full h-64 bg-top bg-cover"
        style={{
          backgroundImage: cover ? `url("${cover}")` : "none",
          backgroundColor: cover ? undefined : "#f3f4f6",
        }}
      />

      <div className="flex flex-col w-full md:flex-row">
        <div className="flex flex-row justify-around p-4 font-bold leading-none uppercase text-red-50 bg-red-primary md:flex-col md:items-center md:justify-center md:w-1/4">
          <div className="md:text-2xl">{month}</div>
          <div className="md:text-5xl">{day}</div>
          <div className="md:text-lg">{event?.eventTime ?? ""}</div>
        </div>

        <div className="relative p-4 font-normal md:w-3/4">
          <h3 className="mb-4 text-3xl font-bold leading-none tracking-tight text-red-primary">
            {event?.title ?? ""}
          </h3>
          <p className="leading-normal text-red-950">
            {event?.description ?? ""}
          </p>

          <div className="absolute bottom-0 right-2">
            {(userRole === "admin" || userRole === "teacher") &&
              isAuthenticated && (
                <div className="flex items-center justify-end p-1 gap-1">
                  <EditComponent post={event} />
                  <DeleteIcon id={event._id} />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
