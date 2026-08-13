import course1 from "../../../assets/images/about/collegePrograms/alterSection/course1.jpg";
import course2 from "../../../assets/images/about/collegePrograms/alterSection/course2.jpg";
import course3 from "../../../assets/images/about/collegePrograms/alterSection/course3.jpg";
import course4 from "../../../assets/images/about/collegePrograms/alterSection/course4.jpg";
import course5 from "../../../assets/images/about/collegePrograms/alterSection/course5.jpg";
import course6 from "../../../assets/images/about/collegePrograms/alterSection/course6.jpg";

const shortDescription =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis ratione odio repellat sequ";

const longDescription =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis ratione odio repellat sequi molestias quaerat amet blanditiis magni vero voluptates quo neque pro";

export const collegePrograms = [
  {
    id: 1,
    image: course1,
    imagePosition: "right",
    title: "Bachelor of Science in Accountancy",
    description: shortDescription,
    background: "red",
    animation: "left",
    contentClassName: "lg:p-20",
    centerImage: false,
  },
  {
    id: 2,
    image: course2,
    imagePosition: "left",
    title: "Bachelor of Science in Business Administration",
    description: longDescription,
    background: "gray",
    animation: "right",
    showTexture: true,
    centerImage: false,
  },
  {
    id: 3,
    image: course3,
    imagePosition: "right",
    title: "Bachelor of Science in Computer Science",
    description: shortDescription,
    background: "red",
    animation: "left",
    contentClassName: "lg:p-20",
    centerImage: false,
  },
  {
    id: 4,
    image: course4,
    imagePosition: "left",
    title: "Bachelor of Science in Criminology",
    description: `${longDescription} Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat architecto reprehend`,
    background: "gray",
    animation: "right",
    showTexture: true,
    centerImage: false,
  },
  {
    id: 5,
    image: course5,
    imagePosition: "right",
    title: "Bachelor of Science in Elementary Education",
    description: shortDescription,
    background: "red",
    animation: "left",
    contentClassName: "lg:p-20",
    centerImage: false,
  },
  {
    id: 6,
    image: course6,
    imagePosition: "left",
    title: "Bachelor of Science in Tourism Management",
    description: longDescription,
    background: "gray",
    animation: "right",
    showTexture: true,
    centerImage: false,
  },
];
