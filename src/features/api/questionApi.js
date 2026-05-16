import { apiSlice } from "./apiSlice";

export const questionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTextQuestions: builder.query({
      query: (params) => ({ url: "text-questions/", params }),
      providesTags: ["TextQuestion"],
    }),
    createTextQuestion: builder.mutation({
      query: (body) => ({
        url: "text-questions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TextQuestion"],
    }),
    updateTextQuestion: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `text-questions/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TextQuestion"],
    }),
    deleteTextQuestion: builder.mutation({
      query: (id) => ({
        url: `text-questions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["TextQuestion"],
    }),
    getNumericQuestions: builder.query({
      query: (params) => ({ url: "numeric-questions/", params }),
      providesTags: ["NumericQuestion"],
    }),
    createNumericQuestion: builder.mutation({
      query: (body) => ({
        url: "numeric-questions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["NumericQuestion"],
    }),
    updateNumericQuestion: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `numeric-questions/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["NumericQuestion"],
    }),
    deleteNumericQuestion: builder.mutation({
      query: (id) => ({
        url: `numeric-questions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["NumericQuestion"],
    }),
    getChoiceQuestions: builder.query({
      query: (params) => ({ url: "choice-questions/", params }),
      providesTags: ["ChoiceQuestion"],
    }),
    createChoiceQuestion: builder.mutation({
      query: (body) => ({
        url: "choice-questions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ChoiceQuestion"],
    }),
    updateChoiceQuestion: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `choice-questions/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ChoiceQuestion"],
    }),
    deleteChoiceQuestion: builder.mutation({
      query: (id) => ({
        url: `choice-questions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChoiceQuestion"],
    }),
    createChoice: builder.mutation({
      query: (body) => ({
        url: "choices/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Choice"],
    }),
    deleteChoice: builder.mutation({
      query: (id) => ({
        url: `choices/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Choice"],
    }),
  }),
});

export const {
  useGetTextQuestionsQuery,
  useCreateTextQuestionMutation,
  useUpdateTextQuestionMutation,
  useDeleteTextQuestionMutation,
  useGetNumericQuestionsQuery,
  useCreateNumericQuestionMutation,
  useUpdateNumericQuestionMutation,
  useDeleteNumericQuestionMutation,
  useGetChoiceQuestionsQuery,
  useCreateChoiceQuestionMutation,
  useUpdateChoiceQuestionMutation,
  useDeleteChoiceQuestionMutation,
  useCreateChoiceMutation,
  useDeleteChoiceMutation,
} = questionApi;
