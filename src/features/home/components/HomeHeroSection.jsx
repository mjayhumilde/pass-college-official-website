import BtnPriWhite from "../../../components/BtnPriWhite";
import PopUpAnimation from "../../../components/PopUpAnimation";
import adsVideo from "../../../assets/videos/pass_ads_video.mp4";

export default function HomeHeroSection() {
  const playVideo = (event) => {
    event.currentTarget.muted = false;
    event.currentTarget.play();
  };

  return (
    <section>
      <div className="w-full">
        <div className="w-full h-60 sm:h-auto bg-gradient-to-t from-[rgb(128,0,0)] to-white">
          <video
            src={adsVideo}
            className="block object-cover w-full h-full"
            muted
            autoPlay
            loop
            playsInline
            onClick={playVideo}
          />
        </div>

        <div className="bg-red-primary">
          <PopUpAnimation>
            <div className="flex flex-col items-center justify-center px-5 py-5 space-y-4 sm:flex-row sm:py-4 sm:space-y-0 sm:space-x-5">
              <BtnPriWhite text="ABOUT US" route="about/who-we-are" />
              <BtnPriWhite text="WORK WITH US" route="careers" />
            </div>
          </PopUpAnimation>
        </div>
      </div>
    </section>
  );
}
