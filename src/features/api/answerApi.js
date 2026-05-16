import { apiSlice } from "./apiSlice";

export const answerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  useSubmitTextAnswerMutation,
  useUpdateTextAnswerMutation,
  useSubmitNumericAnswerMutation,
  useUpdateNumericAnswerMutation,
  useSubmitChoiceAnswerMutation,
  useDeleteChoiceAnswerMutation,
} = answerApi;
