const SectionUnbalance = ({ label, description }) => {
  return (
    <section className="my-8 2xl:container 2xl:mx-auto text-red-950">
      <div className=" lg:px-40 p-5 sm:grid sm:grid-cols-[1fr_1.5fr] md:gap-6">
        <div className="sm:text-center md:text-start">
          <h2 className="mb-5 text-2xl font-bold md:text-4xl text-red-primary">
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
