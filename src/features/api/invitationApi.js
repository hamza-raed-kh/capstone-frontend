import { apiSlice } from "./apiSlice";

export const invitationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvitations: builder.query({
      query: (params) => ({ url: "event-invitations/", params }),
      providesTags: ["EventInvitation"],
    }),
    createInvitation: builder.mutation({
      query: (body) => ({
        url: "event-invitations/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EventInvitation"],
    }),
    acceptInvitation: builder.mutation({
      query: (id) => ({
        url: `event-invitations/${id}/accept/`,
        method: "POST",
      }),
      invalidatesTags: ["EventInvitation"],
    }),
    declineInvitation: builder.mutation({
      query: (id) => ({
        url: `event-invitations/${id}/decline/`,
        method: "POST",
      }),
      invalidatesTags: ["EventInvitation"],
    }),
  }),
});

export const {
  useGetInvitationsQuery,
  useCreateInvitationMutation,
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
} = invitationApi;
