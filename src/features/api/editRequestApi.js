import { apiSlice } from "./apiSlice";

export const editRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEditRequests: builder.query({
      query: (params) => ({ url: "event-edit-requests/", params }),
      providesTags: ["EventEditRequest"],
    }),
    getEditRequest: builder.query({
      query: (id) => `event-edit-requests/${id}/`,
      providesTags: ["EventEditRequest"],
    }),
    createEditRequest: builder.mutation({
      query: (body) => ({
        url: "event-edit-requests/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EventEditRequest"],
    }),
    deleteEditRequest: builder.mutation({
      query: (id) => ({
        url: `event-edit-requests/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventEditRequest"],
    }),
    approveEditRequest: builder.mutation({
      query: (id) => ({
        url: `event-edit-requests/${id}/approve/`,
        method: "POST",
      }),
      invalidatesTags: ["EventEditRequest", "Event"],
    }),
    rejectEditRequest: builder.mutation({
      query: (id) => ({
        url: `event-edit-requests/${id}/reject/`,
        method: "POST",
      }),
      invalidatesTags: ["EventEditRequest"],
    }),
  }),
});

export const {
  useGetEditRequestsQuery,
  useGetEditRequestQuery,
  useCreateEditRequestMutation,
  useDeleteEditRequestMutation,
  useApproveEditRequestMutation,
  useRejectEditRequestMutation,
} = editRequestApi;
