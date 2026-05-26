import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register/",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login/",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
        } catch {}
      },
    }),
    adminLogin: builder.mutation({
      query: (body) => ({
        url: "auth/admin-login/",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
        } catch {}
      },
    }),
    refreshToken: builder.mutation({
      query: (body) => ({
        url: "auth/token/refresh/",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query({
      query: () => "users/me/",
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => `users/${id}/`,
    }),
    updateMe: builder.mutation({
      query: (body) => ({
        url: "users/me/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteMe: builder.mutation({
      query: (body) => ({
        url: "users/me/delete/",
        method: "POST",
        body,
      }),
    }),
    getMeInterests: builder.query({
      query: () => "users/me/interests/",
      providesTags: ["UserInterest"],
      transformResponse: (response) => response.map((item) => item.topic.id),
    }),
    setMeInterests: builder.mutation({
      query: (topicIds) => ({
        url: "users/me/interests/",
        method: "PUT",
        body: { topic_ids: topicIds },
      }),
      invalidatesTags: ["UserInterest"],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "auth/password/change/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAdminLoginMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useDeleteMeMutation,
  useGetMeInterestsQuery,
  useSetMeInterestsMutation,
  useGetUserQuery,
  useChangePasswordMutation,
} = authApi;
