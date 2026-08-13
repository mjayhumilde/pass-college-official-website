import { useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";
import { ExternalLink, MegaphoneOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import EmptySection from "../../../components/EmptySection";
import SectionAnimator from "../../../components/SectionAnimator";
import {
  newsContainerVariants,
  newsItemPopVariants,
} from "../constants/animations";
import SectionTitle from "./SectionTitle";

const getGridColumns = (itemCount) => {
  if (itemCount === 1) return "grid-cols-1";
  if (itemCount === 2) return "grid-cols-1 sm:grid-cols-2";
  if (itemCount === 3) return "grid-cols-1 sm:grid-cols-3 md:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
};

export default function LatestNewsSection({ news }) {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0 });
  const gridColumns = getGridColumns(news.length);

  return (
    <section className="bg-gray">
      <SectionAnimator>
        <SectionTitle>LATEST NEWS</SectionTitle>

        <div className="container mx-auto">
          {news.length === 0 ? (
            <EmptySection icon={MegaphoneOff} type="NEWS" />
          ) : (
            <Motion.div
              ref={contentRef}
              variants={newsContainerVariants}
              initial="hidden"
              animate={isContentInView ? "visible" : "hidden"}
            >
              <Motion.div className={`grid gap-3 p-3 md:gap-6 ${gridColumns}`}>
                {news.slice(0, 4).map((item) => (
                  <Motion.div
                    key={item._id}
                    variants={newsItemPopVariants}
                    className={`flex flex-col h-full rounded-lg shadow-lg ${
                      news.length === 1 ? "lg:px-72 lg:py-5" : ""
                    }`}
                  >
                    <div
                      className={`h-48 overflow-hidden sm:h-56 md:h-64 ${
                        news.length <= 3 ? "lg:h-96" : ""
                      }`}
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-500 rounded-t-lg"
                        src={item.images[0]}
                        alt={item.title}
                      />
                    </div>

                    <Link to={`news-events#news-${item.id}`}>
                      <div className="flex items-center justify-center p-3 font-semibold rounded-b-lg bg-red-primary text-red-50">
                        <div className="flex items-start max-w-full gap-1 underline cursor-pointer decoration-red-300 hover:decoration-red-50">
                          <span className="text-sm line-clamp-3">
                            {item.description}
                          </span>
                          <ExternalLink className="flex-shrink-0 w-4 h-4 mt-1" />
                        </div>
                      </div>
                    </Link>
                  </Motion.div>
                ))}
              </Motion.div>

              <Motion.div
                variants={newsItemPopVariants}
                className="flex items-center justify-center pt-5 pb-10"
              >
                <button
                  onClick={() => navigate("news-events")}
                  className="cursor-pointer rounded-2xl text-sm md:text-base px-6 py-1 border-red text-red-primary font-bold hover:bg-[rgb(128,0,0)] hover:text-white transition-colors duration-500"
                >
                  SEE MORE NEWS
                </button>
              </Motion.div>
            </Motion.div>
          )}
        </div>
      </SectionAnimator>
    </section>
  );
}
