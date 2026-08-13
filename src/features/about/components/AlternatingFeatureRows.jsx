import LeftAnimation from "../../../components/LeftAnimation";
import OpacityAnimation from "../../../components/OpacityAnimation";
import RightAnimation from "../../../components/RightAnimation";

const backgroundClasses = {
  gray: "bg-gray-secondary-opacity",
  red: "bg-red-primary",
  redOpacity: "bg-red-primary-opacity",
};

const textureImage =
  "https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg";

export default function AlternatingFeatureRows({ items }) {
  return (
    <section className="2xl:container 2xl:mx-auto">
      {items.map((item) => {
        const imageOnRight = item.imagePosition === "right";
        const TextAnimation =
          item.animation === "right" ? RightAnimation : LeftAnimation;

        return (
          <section
            key={item.id}
            className="flex flex-col lg:grid lg:grid-cols-2"
          >
            <div className={imageOnRight ? "lg:order-2" : "lg:order-1"}>
              <OpacityAnimation>
                <div
                  className={`h-[400px] lg:h-[500px] bg-cover bg-no-repeat ${
                    item.centerImage === false ? "" : "bg-center"
                  }`}
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label={item.imageAlt || item.title}
                />
              </OpacityAnimation>
            </div>

            <div
              className={`relative min-h-[220px] lg:h-[500px] bg-cover bg-center bg-no-repeat ${
                imageOnRight ? "lg:order-1" : "lg:order-2"
              }`}
              style={
                item.showTexture
                  ? { backgroundImage: `url(${textureImage})` }
                  : undefined
              }
            >
              <div
                className={`flex items-center justify-center h-full p-5 text-red-50 sm:p-10 sm:px-16 sm:py-6 ${
                  item.contentClassName || "lg:p-10"
                } ${backgroundClasses[item.background] || backgroundClasses.red}`}
              >
                <TextAnimation>
                  <div className="container mx-auto space-y-4 lg:space-y-7">
                    <h2 className="text-3xl font-bold">{item.title}</h2>
                    <p className="w-5/6 sm:w-4/6">{item.description}</p>
                  </div>
                </TextAnimation>
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
}
