import alter1 from "../../../assets/images/about/whoWeAre/alterSection/alter1.jpg";
import alter2 from "../../../assets/images/about/whoWeAre/alterSection/alter2.jpg";
import alter3 from "../../../assets/images/about/whoWeAre/alterSection/alter3.jpg";
import ourValues1 from "../../../assets/images/about/whoWeAre/ourValues/ourValues1.jpg";
import ourValues2 from "../../../assets/images/about/whoWeAre/ourValues/ourValues2.jpg";
import ourValues3 from "../../../assets/images/about/whoWeAre/ourValues/ourValues3.jpg";
import pastAndFuture1 from "../../../assets/images/about/whoWeAre/pastAndFuture/pastAndFuture1.jpg";
import pastAndFuture2 from "../../../assets/images/about/whoWeAre/pastAndFuture/pastAndFuture2.jpg";

export const whoWeAreHighlights = [
  {
    id: 1,
    image: alter1,
    imagePosition: "left",
    title: "We shape and define students",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis ratione odio repellat sequi molestias quaerat amet blanditiis magni vero voluptates quo neque pro",
    background: "gray",
    animation: "left",
    showTexture: true,
  },
  {
    id: 2,
    image: alter2,
    imagePosition: "right",
    title: "We believe freedom of expression is fundamental",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis ratione odio repellat sequ",
    background: "red",
    animation: "right",
    contentClassName: "lg:p-20",
  },
  {
    id: 3,
    image: alter3,
    imagePosition: "left",
    title: "We tackle the communities most pressing issues",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis ratione odio repellat sequi molestias quaerat amet blanditiis magni vero voluptates quo neque pro Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat architecto reprehend",
    background: "gray",
    animation: "left",
    showTexture: true,
  },
];

export const sharedValues = [
  {
    id: 1,
    image: ourValues1,
    title: "INTEGRITY",
    description:
      "Academic integrity, built on honesty and responsibility, forms the moral foundation of the PASSian community, upholding our reputation and commitment to justice and service.",
  },
  {
    id: 2,
    image: ourValues2,
    title: "NATIONALISM",
    description:
      "PASSian Education fosters holistic development, national loyalty, cultivating empowered citizens grounded in honesty, courage, compassion, committed to democratic patriotic ideals for civil, sustainable society.",
  },
  {
    id: 3,
    image: ourValues3,
    title: "INNOVATIVE",
    description:
      "PASSian education integrates independent and collaborative learning, fostering interdisciplinary thought and innovation to explore knowledge frontiers across disciplines.",
  },
];

export const legacyLearningItems = [
  {
    id: 1,
    image: pastAndFuture1,
    title: "College Programs we Offer",
    description:
      "Explore diverse degree programs equipping you with skills and knowledge for a successful future. From business and technology to education and hospitality, we foster academic excellence, preparing you for real-world impact.",
    route: "/about/college-programs",
  },
  {
    id: 2,
    image: pastAndFuture2,
    title: "The History of our School",
    description:
      "Founded in 1997 as the Philippine Accountancy and Science School, PASS College continues Mrs. Adelina M. Morante's dream of providing quality, well-rounded education to produce top-caliber, values-driven graduates.",
    route: "/about/history-tradition",
  },
];
