export default function SectionTitle({ children, underlineClassName = "md:w-32" }) {
  return (
    <div className="pt-10 pb-5 text-center md:pt-20">
      <h2 className="text-2xl font-bold tracking-wider md:text-4xl text-red-primary">
        {children}
      </h2>
      <div
        className={`w-20 mx-auto mt-2 border-b-2 border-red-950 ${underlineClassName}`}
      />
    </div>
  );
}
