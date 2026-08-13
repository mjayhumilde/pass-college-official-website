export default function AboutStatementSection({ title, description }) {
  return (
    <section className="p-5 my-8 text-red-950 2xl:container 2xl:mx-auto lg:px-40 sm:grid sm:grid-cols-[1fr_1.5fr] md:gap-6">
      <div className="sm:text-center md:text-start">
        <h2 className="mb-5 text-2xl font-bold md:text-4xl text-red-primary">
          {title}
        </h2>
      </div>
      <div className="space-y-2 sm:space-y-4">
        <p>{description}</p>
      </div>
    </section>
  );
}
