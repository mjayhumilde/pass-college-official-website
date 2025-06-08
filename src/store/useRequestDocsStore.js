import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { requestDocsData } from "../data/requestDocs/request";
import { allUserRequest as allUserRequestData } from "../data/requestDocs/allUserRequest";

// {
//     id: "REQ-2025-003",
//     documentType: "Recommendation Letter",
//     requestDate: "2025-03-25",
//     status: "Ready for Pickup",
//     estimatedCompletion: "2025-04-01",
// },

const useRequestDocsStore = create(
  persist(
    (set) => ({
      requestsDocs: requestDocsData,
      allUserRequest: allUserRequestData,

      // add new request
      addNewRequestDocs: (newRequest) =>
        set((state) => ({
          requestsDocs: [newRequest, ...state.requestsDocs],
        })),

      // add new all userRequest
      addNewAllUserRequest: (newRequest) =>
        set((state) => ({
          allUserRequest: [newRequest, ...state.allUserRequest],
        })),

      // Update Request Status
      updateUserRequestStatus: (id) =>
        set((state) => ({
          allUserRequest: state.allUserRequest.map((request) =>
            request.id === id
              ? {
                  ...request,
                  status:
                    request.status.toLowerCase() === "processing"
                      ? "Ready for Pickup"
                      : "Processing",
                }
              : request
          ),
          requestsDocs: state.requestsDocs.map((request) =>
            request.id === id
              ? {
                  ...request,
                  status:
                    request.status.toLowerCase() === "processing"
                      ? "Ready for Pickup"
                      : "Processing",
                }
              : request
          ),
        })),
      // news: state.news.filter((post) => post.id != id),
      deleteUserRequest: (id) =>
        set((state) => ({
          allUserRequest: state.allUserRequest.filter((req) => req.id != id),
        })),
    }),

    {
      name: "request-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRequestDocsStore;
