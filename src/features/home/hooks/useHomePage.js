import { useEffect } from "react";
import usePostStore from "../../../store/usePostStore";

export const useHomePage = () => {
  const events = usePostStore((state) => state.events);
  const news = usePostStore((state) => state.news);
  const getAllPost = usePostStore((state) => state.getAllPost);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  return { events, news };
};

export default useHomePage;
