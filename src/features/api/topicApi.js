import { apiSlice } from "./apiSlice";

export const topicApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => "topics/",
      providesTags: ["Topic"],
    }),
  }),
});

export const { useGetTopicsQuery } = topicApi;
