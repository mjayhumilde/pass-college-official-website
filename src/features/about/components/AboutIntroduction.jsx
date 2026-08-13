import SectionAnimator from "../../../components/SectionAnimator";

export default function AboutIntroduction({ children, title, className = "" }) {
  return (
    <SectionAnimator>
      <section
        className={`container px-5 pt-6 mx-auto space-y-2 md:pt-14 md:px-28 ${className}`}
      >
        <div className="pb-1 text-center md:pb-2">
          <h2 className="p-1 text-2xl font-bold tracking-wider md:text-4xl text-red-primary">
            {title}
          </h2>
          <div className="w-20 mx-auto mt-2 border-b-2 md:w-92 border-red-950" />
        </div>
        <div className="space-y-5 text-center text-red-950 lg:px-10">
          {children}
        </div>
      </section>
    </SectionAnimator>
  );
}
