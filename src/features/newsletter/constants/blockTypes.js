import { Heading, Image, Minus, MousePointer, Type } from "lucide-react";

export const BLOCK_TYPES = [
  {
    type: "heading",
    label: "Heading",
    icon: Heading,
    color: "bg-red-100 text-red-700",
  },
  {
    type: "text",
    label: "Text",
    icon: Type,
    color: "bg-blue-100 text-blue-700",
  },
  {
    type: "image",
    label: "Image",
    icon: Image,
    color: "bg-green-100 text-green-700",
  },
  {
    type: "button",
    label: "Button",
    icon: MousePointer,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    type: "divider",
    label: "Divider",
    icon: Minus,
    color: "bg-gray-100 text-gray-700",
  },
];

export const createBlock = (type) => ({
  id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  type,
  content:
    type === "heading"
      ? "Your Heading Here"
      : type === "text"
        ? "Write your message here..."
        : "",
  url:
    type === "button"
      ? "https://pass-college.netlify.app"
      : type === "image"
        ? ""
        : "",
  label: type === "button" ? "Click Here" : "",
  alt: type === "image" ? "Image description" : "",
});
