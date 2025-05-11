import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { events } from "../data/news-events/events";
import { news } from "../data/news-events/news";
import { announcement } from "../data/announcement/announcePost";
import { uniforms } from "../data/uniforms/uniforms";
import { careers } from "../data/careers/careers";

const usePostStore = create(
  persist(
    (set) => ({
      announcements: announcement,
      events: events,
      news: news,
      uniforms: uniforms,
      careers: careers,

      // add functions
      addNewAnnouncement: (newAnnouncement) =>
        set((state) => ({
          announcements: [newAnnouncement, ...state.announcements],
        })),
      addNewEvents: (newEvent) =>
        set((state) => ({ events: [newEvent, ...state.events] })),
      addNewNews: (newNews) =>
        set((state) => ({ news: [newNews, ...state.news] })),
      addNewUniforms: (newUniforms) =>
        set((state) => ({ uniforms: [newUniforms, ...state.uniforms] })),
      addNewCareers: (newCareer) =>
        set((state) => ({ careers: [newCareer, ...state.careers] })),

      // delete functions
      deleteAnnouncement: (id) =>
        set((state) => ({
          announcements: state.announcements.filter((post) => post.id != id),
        })),
      deleteEvents: (id) =>
        set((state) => ({
          events: state.events.filter((post) => post.id != id),
        })),
      deleteNews: (id) =>
        set((state) => ({
          news: state.news.filter((post) => post.id != id),
        })),
      deleteUniforms: (id) =>
        set((state) => ({
          uniforms: state.uniforms.filter((post) => post.id != id),
        })),
      deleteCareers: (id) =>
        set((state) => ({
          careers: state.careers.filter((post) => post.id != id),
        })),
    }),
    {
      name: "post-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePostStore;
