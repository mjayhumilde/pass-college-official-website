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
          const response = await api.get("/post");

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
          const res = await api.delete(`/post/${encodeURIComponent(id)}`);
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
              `/post/${encodeURIComponent(id)}`,
              updateData
            );
          } else {
            // JSON updates
            response = await api.patch(
              `/post/${encodeURIComponent(id)}`,
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

      // --FUNCITONS FOR PROTOTYPING-- will remove it sooner or later
      // Add functions
      addNewAnnouncement: (newAnnouncement) =>
        set((state) => ({
          announcements: [newAnnouncement, ...state.announcements],
        })),
      addNewEvent: (newEvent) =>
        set((state) => ({ events: [newEvent, ...state.events] })),
      addNewNews: (newNews) =>
        set((state) => ({ news: [newNews, ...state.news] })),
      addNewUniforms: (newUniforms) =>
        set((state) => ({ uniforms: [newUniforms, ...state.uniforms] })),
      addNewCareer: (newCareer) =>
        set((state) => ({ careers: [newCareer, ...state.careers] })),

      // Delete functions
      deleteAnnouncement: (id) =>
        set((state) => ({
          announcements: state.announcements.filter((post) => post._id !== id),
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((post) => post._id !== id),
        })),
      deleteNews: (id) =>
        set((state) => ({
          news: state.news.filter((post) => post._id !== id),
        })),
      deleteUniforms: (id) =>
        set((state) => ({
          uniforms: state.uniforms.filter((post) => post._id !== id),
        })),
      deleteCareer: (id) =>
        set((state) => ({
          careers: state.careers.filter((post) => post._id !== id),
        })),
    }),
    {
      name: "post-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePostStore;
