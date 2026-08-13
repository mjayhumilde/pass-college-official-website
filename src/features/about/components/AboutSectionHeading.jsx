export default function AboutSectionHeading({
  children,
  className = "text-2xl md:text-3xl",
  underlineClassName = "w-20 md:w-32",
}) {
  return (
    <div className="pt-10 pb-5 text-center">
      <h2
        className={`${className} font-bold tracking-wider text-red-primary`}
      >
        {children}
      </h2>
      <div
        className={`${underlineClassName} mx-auto mt-2 border-b-2 border-red-950`}
      />
    </div>
  );
}
