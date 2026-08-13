import HeroBgSection from "../../../components/HeroBgSection";
import PopUpAnimation from "../../../components/PopUpAnimation";
import historyBackground from "../../../assets/images/about/historyTradition/bg-history.jpg";
import AboutIntroduction from "../components/AboutIntroduction";
import AboutStatementSection from "../components/AboutStatementSection";
import AlternatingFeatureRows from "../components/AlternatingFeatureRows";
import CircularFeatureSection from "../components/CircularFeatureSection";
import HistoryGallery from "../components/HistoryGallery";
import PresidentQuoteSection from "../components/PresidentQuoteSection";
import TraditionsSection from "../components/TraditionsSection";
import { deeperMeanings, historyHighlights } from "../data/historyTradition";
import useScrollToTop from "../hooks/useScrollToTop";

export default function HistoryAndTraditionPage() {
  useScrollToTop();

  return (
    <>
      <HeroBgSection img={historyBackground} label="History and Traditions" />

      <AboutIntroduction title="HISTORY OF PASS COLLEGE" className="mb-28">
        <p>
          It has been an undying dream of Mrs. Adelina M. Morante to establish an
          educational institution that will produce top-caliber graduates who
          will not only be successful in their fields of endeavor but will also
          be God-loving and law-abiding citizens. This dream of an academic
          institution came into reality in 1997 when PASS College was
          inaugurated. Initially, it was known as the Philippine Accountancy and
          Science School (PASS). Then in 2001, the name was changed to PASS
          College. PASS College started with four ladderized programs namely:
          Bachelor of Science in Accountancy, Bachelor of Science in Computer
          Science, Bachelor of Science in Commerce, and Bachelor of Science in
          Secretarial Administration. Then additional programs were offered such
          as Bachelor of Elementary Education, Two-Years and One-Year Tourism
          Hotel and Restaurant Management, Two-Years Computer Secretarial and
          Six-Month Caregiving Course. Over the years, more courses and/or
          programs have been offered such as Bachelor of Science in Business
          Administration, Bachelor of Science in Criminology, Bachelor of Science
          in Hospitality Management, and Bachelor of Science in Tourism
          Management to answer the needs of the people of Western Pangasinan and
          the nearby Zambales towns, and anyone who seeks quality learning under
          competent and dedicated instructors and with the best facilities which
          are regularly updated to enhance learning and improves student learning
          competence. In 2007, PASS College responded to Executive Order 358 of
          President Gloria Macapagal-Arroyo, inaugurating the Ladderized
          Education System in the college. The quest for academic excellence
          continues and will always be the burning propel of PASS College to
          achieve its mission to provide the youth with a quality well-rounded
          education.
        </p>
      </AboutIntroduction>

      <PopUpAnimation>
        <AboutStatementSection
          title="A tradition of breaking with tradition"
          description="Since 2016, PASS College has blended academic excellence with innovation, redefining education for the modern world. As the #1 producer of CPAs in Western Pangasinan, we honor tradition while pushing boundaries to shape future leaders."
        />
      </PopUpAnimation>

      <AlternatingFeatureRows items={historyHighlights} />
      <PresidentQuoteSection />
      <HistoryGallery />
      <CircularFeatureSection title="DEEPER MEANINGS" items={deeperMeanings} />
      <TraditionsSection />
    </>
  );
}
