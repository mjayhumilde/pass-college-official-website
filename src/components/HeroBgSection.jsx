const HeroBgSection = ({ img, label }) => {
  return (
    <section
      className=" h-[200px] md:h-[400px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="relative flex 2xl:container 2xl:mx-auto">
        <div className="absolute bg-white left-5 sm:left-10 lg:left-40 top-20 md:top-65">
          <div className="w-3/4 h-2 bg-red-primary"></div>
          <h2 className="p-2 text-2xl text-red-950 sm:text-3xl sm:p-4">
            {label}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroBgSection;
