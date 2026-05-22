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
      query: ({ id, ...body }) => ({
        url: `teams/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Team", id }, "Team"],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `teams/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;
