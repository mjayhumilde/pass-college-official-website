import { CalendarOff } from "lucide-react";
import EventCard from "./EventCard";

const SectionEventLayout = ({ data, label }) => {
  return (
    <section
      className={`container mx-auto ${
        label === "EVENTS" ? "mt-0 md:mt-0" : "mt-10 md:mt-15"
      }`}
    >
      <div className={`text-center  ${label === "EVENTS" && "px-2 pb-0 pt-7"}`}>
        <h2
          className={`text-2xl md:text-4xl font-bold tracking-wider text-red-primary `}
        >
          {label}
        </h2>
        <div className="w-25 border-b-2 border-red-950 mx-auto mt-2"></div>
      </div>
      <div
        className={`text-center mt-2 mx-1 p-5 pb-5 bg-red-primary ${
          label != "EVENTS" && "hidden"
        }`}
      >
        <h2 className="text-xl md:text-2xl font-bold tracking-wider text-red-50">
          EXCITING ACTIVITIES & GATHERINGS
        </h2>
      </div>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 p-4">
          {label === "EVENTS"
            ? data.map((event, index) => (
                <div
                  className={`shadow-lg
                ${
                  (data.length === 3 && index === 2) ||
                  (data.length === 1 && index === 0)
                    ? "lg:col-span-2 lg:mx-60 2xl:mx-80"
                    : ""
                }`}
                  key={event.id}
                >
                  <EventCard event={event} />
                </div>
              ))
            : data.slice(0, 2).map((event, index) => (
                <div
                  className={`shadow-lg
              ${
                data.length === 1 && index === 0
                  ? "lg:col-span-2 lg:mx-60 2xl:mx-80"
                  : ""
              }`}
                  key={event.id}
                >
                  <EventCard event={event} />
                </div>
              ))}
        </div>
      ) : (
        <div className="flex justify-center items-center p-10 text-gray-500">
          <div className="flex gap-2 flex-col justify-center items-center rounded-full bg-gray p-10">
            No events at the moment...
            <span className="text-red-primary">
              <CalendarOff size={78} />
            </span>
          </div>
        </div>
      )}
      <div
        className={`flex justify-center items-center pt-5 pb-10 ${
          label === "EVENTS" || data.length === 1 ? "hidden" : ""
        }`}
      >
        <button className="cursor-pointer text-sm md:text-base px-6 py-1 border-red text-red-primary font-bold hover:bg-[rgb(128,0,0)] hover:text-white transition-colors duration-500">
          SEE MORE EVENTS
        </button>
      </div>
    </section>
  );
};

export default SectionEventLayout;
