import { apiSlice } from "./apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (params) => ({ url: "chat-channels/", params }),
      providesTags: ["Channel"],
    }),
    createChannel: builder.mutation({
      query: (body) => ({
        url: "chat-channels/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Channel"],
    }),
    getMessages: builder.query({
      query: (params) => ({ url: "chat-messages/", params }),
      providesTags: ["Message"],
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: "chat-messages/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useCreateChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
