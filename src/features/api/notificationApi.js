import { apiSlice } from "./apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params) => ({ url: "notifications/", params }),
      providesTags: ["Notification"],
    }),
    getNotificationRecipients: builder.query({
      query: (params) => ({ url: "notification-recipients/", params }),
      providesTags: ["NotificationRecipient"],
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `notification-recipients/${id}/`,
        method: "PATCH",
        body: { is_read: true },
      }),
      invalidatesTags: ["NotificationRecipient"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationRecipientsQuery,
  useMarkAsReadMutation,
} = notificationApi;
