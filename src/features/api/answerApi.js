import { apiSlice } from "./apiSlice";

export const answerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTextAnswers: builder.query({
      query: (params) => ({ url: "text-answers/", params }),
      providesTags: ["TextAnswer"],
    }),
    submitTextAnswer: builder.mutation({
      query: (body) => ({
        url: "text-answers/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TextAnswer"],
    }),
    updateTextAnswer: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `text-answers/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TextAnswer"],
    }),
    getNumericAnswers: builder.query({
      query: (params) => ({ url: "numeric-answers/", params }),
      providesTags: ["NumericAnswer"],
    }),
    submitNumericAnswer: builder.mutation({
      query: (body) => ({
        url: "numeric-answers/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["NumericAnswer"],
    }),
    updateNumericAnswer: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `numeric-answers/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["NumericAnswer"],
    }),
    getChoiceAnswers: builder.query({
      query: (params) => ({ url: "choice-answers/", params }),
      providesTags: ["ChoiceAnswer"],
    }),
    submitChoiceAnswer: builder.mutation({
      query: (body) => ({
        url: "choice-answers/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ChoiceAnswer"],
    }),
    deleteChoiceAnswer: builder.mutation({
      query: (id) => ({
        url: `choice-answers/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChoiceAnswer"],
    }),
  }),
});

export const {
  useGetTextAnswersQuery,
  useSubmitTextAnswerMutation,
  useUpdateTextAnswerMutation,
  useGetNumericAnswersQuery,
  useSubmitNumericAnswerMutation,
  useUpdateNumericAnswerMutation,
  useGetChoiceAnswersQuery,
  useSubmitChoiceAnswerMutation,
  useDeleteChoiceAnswerMutation,
} = answerApi;
