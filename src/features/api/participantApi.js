import { apiSlice } from "./apiSlice";

export const participantApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParticipants: builder.query({
      query: (params) => ({ url: "team-participants/", params }),
      providesTags: ["TeamParticipant"],
    }),
    createParticipant: builder.mutation({
      query: (body) => ({
        url: "team-participants/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeamParticipant"],
    }),
    updateParticipant: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `team-participants/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TeamParticipant"],
    }),
  }),
});

export const {
  useGetParticipantsQuery,
  useCreateParticipantMutation,
  useUpdateParticipantMutation,
} = participantApi;
