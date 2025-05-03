const HeroBgSection = ({ img, label }) => {
  return (
    <section
      className=" h-[200px] md:h-[400px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="relative flex 2xl:container 2xl:mx-auto">
        <div className=" bg-white absolute left-5 sm:left-10 lg:left-40 top-20 md:top-65">
          <div className="h-2 bg-red-primary w-3/4"></div>
          <h2 className="text-red-950 text-2xl sm:text-3xl p-2 sm:p-4">
            {label}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroBgSection;
