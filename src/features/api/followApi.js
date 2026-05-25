import { apiSlice } from "./apiSlice";

export const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyFollowing: builder.query({
      query: (userId) => `users/${userId}/following/`,
      transformResponse: (response) => response.results || response,
      providesTags: ["Following"],
    }),
    getBlockedUsers: builder.query({
      query: () => "users/blocked/",
      transformResponse: (response) => response.results || response,
      providesTags: ["Blocked"],
    }),
    unfollowUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}/follow/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Following"],
    }),
    unbanUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}/block/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blocked"],
    }),
  }),
});

export const {
  useGetMyFollowingQuery,
  useGetBlockedUsersQuery,
  useUnfollowUserMutation,
  useUnbanUserMutation,
} = followApi;
