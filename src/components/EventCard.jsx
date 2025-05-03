const EventCard = ({ event }) => {
  return (
    <div className="flex flex-col w-full bg-white   ">
      <div
        className="w-full h-64 bg-top bg-cover "
        style={{
          backgroundImage: ` url(${event.img})`,
        }}
      ></div>
      <div className="flex flex-col w-full md:flex-row">
        <div className="flex flex-row justify-around p-4 font-bold  leading-none text-red-50 uppercase bg-red-primary  md:flex-col md:items-center md:justify-center md:w-1/4">
          <div className="md:text-2xl">{event.month}</div>
          <div className="md:text-5xl">{event.monthNum}</div>
          <div className="md:text-lg">{event.time}</div>
        </div>
        <div className="p-4 font-normal md:w-3/4">
          <h3 className="mb-4  text-3xl font-bold leading-none tracking-tight text-red-primary">
            {event.title}
          </h3>
          <p className="leading-normal text-red-950">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

// sm:w-3/4 md:w-1/2 lg:w-3/5
