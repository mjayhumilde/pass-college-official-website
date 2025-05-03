const SectionUnbalance = ({ label, description }) => {
  return (
    <section className="2xl:container 2xl:mx-auto my-8 text-red-950">
      <div className=" lg:px-40 p-5 sm:grid sm:grid-cols-[1fr_1.5fr] md:gap-6">
        <div className="sm:text-center md:text-start">
          <h2 className="text-2xl md:text-4xl font-bold text-red-primary mb-5">
            {label}
          </h2>
        </div>
        <div className="space-y-2 sm:space-y-4">
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default SectionUnbalance;
