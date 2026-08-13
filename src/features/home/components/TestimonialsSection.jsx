import { testimonials } from "../data/testimonials";

export default function TestimonialsSection() {
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex items-center justify-center mt-8">
          <div>
            <h2 className="font-bold text-[17px] sm:text-xl md:text-4xl text-red-primary">
              TESTIMONIALS AND SUCCESS STORIES
            </h2>
            <div className="mx-auto mt-2 border-b-2 w-56 border-red-950" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:flex justify-center items-center md:gap-5 xl:gap-7 p-5 xl:px-20">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-2 border-2 border-red-primary xl:w-1/3"
            >
              <img className="w-full" src={item.image} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
