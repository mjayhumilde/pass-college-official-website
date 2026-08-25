import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useScrollToPost = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const postId = searchParams.get("postId");
    const docId = searchParams.get("docId");
    const targetId = postId || docId;

    if (targetId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`post-${targetId}`);

        if (element) {
          // Scroll to element with offset for fixed headers
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Add highlight effect
          element.classList.add("highlight-post");
          setTimeout(() => {
            element.classList.remove("highlight-post");
          }, 2000);

          searchParams.delete("postId");
          searchParams.delete("docId");
          setSearchParams(searchParams, { replace: true });
        } else {
          console.warn(`Post with ID ${targetId} not found on the page`);
        }
      }, 800); // increased timeout to ensure posts are loaded

      return () => clearTimeout(timer);
    }
  }, [searchParams, setSearchParams]);
};
