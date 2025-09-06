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
