import useAuthStore from "../store/useAuthStore";
import DeleteIcon from "./DeleteIcon";
import EditComponent from "./EditIcon";

const EventCard = ({ event }) => {
  const userRole = useAuthStore((s) => s.userRole);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Get cover image
  const cover = event?.images?.[0] || null;

  // Parse date for month and day
  let month = "";
  let day = "";
  if (event?.date) {
    const eventDate = new Date(event.date);
    month = eventDate.toLocaleString("default", { month: "short" }); // e.g. Sep
    day = eventDate.getDate(); // e.g. 11
  }

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
        {/* Date Section */}
        <div className="flex flex-row justify-around p-4 font-bold leading-none uppercase text-red-50 bg-red-primary md:flex-col md:items-center md:justify-center md:w-1/4">
          <div className="md:text-2xl">{month}</div>
          <div className="md:text-5xl">{day}</div>
          <div className="md:text-lg">{event?.eventTime ?? ""}</div>
        </div>

        {/* Content Section */}
        <div className="relative p-4 font-normal md:w-3/4">
          <h3 className="mb-4 text-3xl font-bold leading-none tracking-tight text-red-primary">
            {event?.title ?? ""}
          </h3>
          <p className="leading-normal text-red-950">
            {event?.description ?? ""}
          </p>

          {/* Admin / Teacher Controls */}
          <div className="absolute bottom-0 right-2">
            {(userRole === "admin" || userRole === "registrar") &&
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
