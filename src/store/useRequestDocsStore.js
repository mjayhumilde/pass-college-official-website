import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { requestDocsData } from "../data/requestDocs/request";

const useRequestDocsStore = create(
  persist(
    (set) => ({
      requestsDocs: requestDocsData,

      // add new request
      addNewRequestDocs: (newRequest) =>
        set((state) => ({
          requestsDocs: [newRequest, ...state.requestsDocs],
        })),
    }),
    {
      name: "request-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRequestDocsStore;
