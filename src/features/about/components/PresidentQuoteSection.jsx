import LeftAnimation from "../../../components/LeftAnimation";
import PopUpAnimation from "../../../components/PopUpAnimation";
import SectionAnimator from "../../../components/SectionAnimator";

export default function PresidentQuoteSection() {
  return (
    <SectionAnimator>
      <section className="w-full px-4 pt-12 bg-gray">
        <div className="relative flex flex-col items-center container mx-auto">
          <div className="font-serif text-9xl text-red-primary">&#8220;</div>
          <div className="px-4 text-center">
            <PopUpAnimation>
              <blockquote className="mb-4 font-serif text-2xl italic md:text-3xl text-red-primary">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aspernatur, error illum, enim maxime veritatis quae qui deserunt
                quisquam unde reiciendis deleniti ipsa exercitationem non dolore
                rem veniam ipsam quis labore. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Sapiente natus placeat, dolorum
                cum eius neque aperiam, eveniet dignissimos tempora perferendis.
              </blockquote>
            </PopUpAnimation>
            <LeftAnimation>
              <cite className="inline-block not-italic text-red-primary">
                - President Mjay Humilde
              </cite>
            </LeftAnimation>
          </div>
          <div className="mt-10 font-serif text-9xl text-red-primary">
            &#8221;
          </div>
        </div>
      </section>
    </SectionAnimator>
  );
}
