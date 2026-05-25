import { apiSlice } from "./apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (params) => ({ url: "teams/", params }),
      providesTags: ["Team"],
    }),
    getTeam: builder.query({
      query: (id) => `teams/${id}/`,
      providesTags: (result, error, id) => [{ type: "Team", id }],
    }),
    createTeam: builder.mutation({
      query: (body) => ({
        url: "teams/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team"],
    }),
    updateTeam: builder.mutation({
      query: (args) => {
        const isFd = args instanceof FormData;
        const id = isFd ? args.get("id") : args.id;
        const body = isFd ? args : (({ id: _, ...rest }) => rest)(args);
        return { url: `teams/${id}/`, method: "PATCH", body };
      },
      invalidatesTags: (result, error, args) => {
        const id = args instanceof FormData ? args.get("id") : args.id;
        return [{ type: "Team", id }, "Team"];
      },
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `teams/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
    submitTeam: builder.mutation({
      query: (id) => ({
        url: `teams/${id}/submit/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Team", id }, "Team"],
    }),
    withdrawTeam: builder.mutation({
      query: (id) => ({
        url: `teams/${id}/withdraw/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Team", id }, "Team"],
    }),
    inviteToTeam: builder.mutation({
      query: ({ id, email }) => ({
        url: `teams/${id}/invite/`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Team", "TeamParticipant", "TeamInvitation"],
    }),
    getTeamParticipants: builder.query({
      query: (params) => ({ url: "team-participants/", params }),
      providesTags: ["TeamParticipant"],
    }),
    getTeamInvitations: builder.query({
      query: (params) => ({ url: "team-invitations/", params }),
      providesTags: ["TeamInvitation"],
    }),
    deleteTeamInvitation: builder.mutation({
      query: (invitationId) => ({
        url: `team-invitations/${invitationId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team", "TeamInvitation", "Notification"],
    }),
    acceptTeamInvite: builder.mutation({
      query: (invitationId) => ({
        url: `team-invitations/${invitationId}/accept/`,
        method: "POST",
      }),
      invalidatesTags: ["Team", "TeamParticipant", "TeamInvitation"],
    }),
    rejectTeamInvite: builder.mutation({
      query: (invitationId) => ({
        url: `team-invitations/${invitationId}/reject/`,
        method: "POST",
      }),
      invalidatesTags: ["Team", "TeamParticipant", "TeamInvitation"],
    }),
    deleteTeamParticipant: builder.mutation({
      query: (participantId) => ({
        url: `team-participants/${participantId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team", "TeamParticipant", "Notification"],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useSubmitTeamMutation,
  useWithdrawTeamMutation,
  useInviteToTeamMutation,
  useGetTeamParticipantsQuery,
  useGetTeamInvitationsQuery,
  useDeleteTeamInvitationMutation,
  useAcceptTeamInviteMutation,
  useRejectTeamInviteMutation,
  useDeleteTeamParticipantMutation,
} = teamApi;
