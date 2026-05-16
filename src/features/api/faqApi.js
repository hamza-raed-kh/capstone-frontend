import { apiSlice } from "./apiSlice";

export const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqQuestions: builder.query({
      query: (params) => ({ url: "event-faq-questions/", params }),
      providesTags: ["FAQQuestion"],
    }),
    createFaqQuestion: builder.mutation({
      query: (body) => ({
        url: "event-faq-questions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FAQQuestion"],
    }),
    updateFaqQuestion: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `event-faq-questions/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["FAQQuestion"],
    }),
    deleteFaqQuestion: builder.mutation({
      query: (id) => ({
        url: `event-faq-questions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQQuestion"],
    }),
  }),
});

export const {
  useGetFaqQuestionsQuery,
  useCreateFaqQuestionMutation,
  useUpdateFaqQuestionMutation,
  useDeleteFaqQuestionMutation,
} = faqApi;
