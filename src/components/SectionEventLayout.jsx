import { CalendarOff } from "lucide-react";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";
import EmptySection from "./EmptySection";

const SectionEventLayout = ({ data, label }) => {
  const navigate = useNavigate();

  return (
    <section
      className={`container mx-auto ${
        label === "EVENTS" ? "mt-0 md:mt-0" : "mt-10 md:mt-15"
      }`}
    >
      {/* Section Header */}
      <div className={`text-center ${label === "EVENTS" && "px-2 pb-0 pt-7"}`}>
        <h2 className="text-2xl md:text-4xl font-bold tracking-wider text-red-primary">
          {label}
        </h2>
        <div className="mx-auto mt-2 border-b-2 w-25 border-red-950"></div>
      </div>

      {/* Sub-header for EVENTS */}
      <div
        className={`text-center mt-2 mx-1 p-5 pb-5 bg-red-primary ${
          label !== "EVENTS" && "hidden"
        }`}
      >
        <h2 className="text-xl font-bold tracking-wider md:text-2xl text-red-50">
          EXCITING ACTIVITIES & GATHERINGS
        </h2>
      </div>

      {/* Content */}
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 md:gap-5">
          {label === "EVENTS"
            ? data.map((event, index) => (
                <div
                  key={event._id || index}
                  className={`rounded-2xl shadow-2xl
                    ${
                      (data.length === 3 && index === 2) ||
                      (data.length === 1 && index === 0)
                        ? "lg:col-span-2 lg:mx-60 2xl:mx-80"
                        : ""
                    }`}
                >
                  <EventCard event={event} />
                </div>
              ))
            : data.slice(0, 2).map((event, index) => (
                <div
                  key={event._id || index}
                  className={`shadow-lg
                    ${
                      data.length === 1 && index === 0
                        ? "lg:col-span-2 lg:mx-60 2xl:mx-80"
                        : ""
                    }`}
                >
                  <EventCard event={event} />
                </div>
              ))}
        </div>
      ) : (
        <EmptySection icon={CalendarOff} type={label} />
      )}

      {/* See More Button */}
      <div
        className={`flex justify-center items-center pt-5 pb-10 ${
          label === "EVENTS" || data.length === 1 || data.length === 0
            ? "hidden"
            : ""
        }`}
      >
        <button
          onClick={() => navigate("/news-events")}
          className="cursor-pointer rounded-2xl text-sm md:text-base px-6 py-1 border-red text-red-primary font-bold hover:bg-[rgb(128,0,0)] hover:text-white transition-colors duration-500"
        >
          SEE MORE EVENTS
        </button>
      </div>
    </section>
  );
};

export default SectionEventLayout;
