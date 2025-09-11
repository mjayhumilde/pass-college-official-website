import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "./api";

const usePostStore = create(
  persist(
    (set) => ({
      announcements: [],
      events: [],
      news: [],
      uniforms: [],
      careers: [],
      posts: [],

      getAllPost: async () => {
        try {
          // api request
          const response = await api.get("/api/v1/post");

          if (response.status === 200 && response.data?.data?.posts) {
            const posts = response.data.data.posts;

            set({
              posts,
              announcements: posts.filter((p) => p.postType === "announcement"),
              events: posts.filter((p) => p.postType === "events"),
              news: posts.filter((p) => p.postType === "news"),
              uniforms: posts.filter((p) => p.postType === "uniforms-update"),
              careers: posts.filter((p) => p.postType === "careers"),
            });
          } else {
            console.error("Invalid response structure", response);
            set({
              error: "Invalid response structure, unable to fetch posts.",
            });
          }
        } catch (error) {
          console.error("Get all posts failed: ", error);
          set({
            error: error.response?.data?.message
              ? error.response.data.message
              : "An error occurred while fetching posts. Please try again.",
          });
        }
      },
      deletePost: async (postId) => {
        const id = String(postId);

        // optimistic remove from all slices
        set((state) => {
          const notId = (p) => p._id !== id && p.id !== id; // supports _id or id
          return {
            posts: state.posts.filter(notId),
            announcements: state.announcements.filter(notId),
            events: state.events.filter(notId),
            news: state.news.filter(notId),
            uniforms: state.uniforms.filter(notId),
            careers: state.careers.filter(notId),
          };
        });

        try {
          // api request
          const res = await api.delete(
            `/api/v1/post/${encodeURIComponent(id)}`
          );
          if (res.status !== 200 && res.status !== 204) {
            throw new Error(
              res.data?.message || `Unexpected status ${res.status}`
            );
          }

          return true;
        } catch (e) {
          console.error("Delete failed:", e);
          // restore from server truth
          await usePostStore.getState().getAllPost();
          set({
            error:
              e.response?.data?.message ||
              e.message ||
              "Failed to delete post.",
          });
          return false;
        }
      },

      editPost: async (postId, updateData, hasFiles = false) => {
        const id = String(postId);

        try {
          let response;
          if (hasFiles) {
            // FormData: let axios set Content-Type with boundary
            response = await api.patch(
              `/api/v1/post/${encodeURIComponent(id)}`,
              updateData
            );
          } else {
            // JSON updates
            response = await api.patch(
              `/api/v1/post/${encodeURIComponent(id)}`,
              updateData
            );
          }

          // Expect: { status: "success", data: { doc: {...} } }
          const updatedPost = response?.data?.data?.doc;
          if (response.status === 200 && updatedPost) {
            set((state) => {
              const replaceIn = (arr) =>
                arr.map((p) => (p._id === id || p.id === id ? updatedPost : p));

              return {
                posts: replaceIn(state.posts),
                announcements: replaceIn(state.announcements),
                events: replaceIn(state.events),
                news: replaceIn(state.news),
                uniforms: replaceIn(state.uniforms),
                careers: replaceIn(state.careers),
              };
            });

            return { success: true, post: updatedPost };
          }

          // Helpful debug when shape is unexpected
          console.warn("Unexpected editPost response:", response?.data);
          throw new Error(
            response?.data?.message || `Unexpected status ${response?.status}`
          );
        } catch (error) {
          console.error("Edit post failed:", error);
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to update post. Please try again.";

          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      createPost: async (payload, opts) => {
        try {
          const res = await api.post("/api/v1/post", payload); // JSON or FormData
          const newPost = res?.data?.data?.doc;

          if (!newPost || ![200, 201].includes(res.status)) {
            throw new Error(
              res?.data?.message || `Unexpected status ${res?.status}`
            );
          }

          set((state) => {
            const dedupe = (arr) => [
              newPost,
              ...arr.filter((p) => (p._id ?? p.id) !== newPost._id),
            ];
            const next = {
              posts: dedupe(state.posts),
              announcements: state.announcements,
              events: state.events,
              news: state.news,
              uniforms: state.uniforms,
              careers: state.careers,
            };

            switch (newPost.postType) {
              case "announcement":
                next.announcements = dedupe(state.announcements);
                break;
              case "events":
                next.events = dedupe(state.events);
                break;
              case "news":
                next.news = dedupe(state.news);
                break;
              case "uniforms-update":
                next.uniforms = dedupe(state.uniforms);
                break;
              case "careers":
                next.careers = dedupe(state.careers);
                break;
              default:
                /* unknown type -> only in posts */ break;
            }

            return next;
          });

          if (opts?.revalidate) {
            await usePostStore.getState().getAllPost();
          }
          return { success: true, post: newPost };
        } catch (error) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Failed to create post. Please try again.";
          console.error("Create post failed:", message);
          set({ error: message });
          return { success: false, error: message };
        }
      },
    }),
    {
      name: "post-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePostStore;
