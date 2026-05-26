import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearTokens } from "../user/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);
  if (result.error?.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const refreshResult = await baseQuery(
        { url: "auth/token/refresh/", method: "POST", body: { refresh: refreshToken } },
        api,
        extra,
      );
      if (refreshResult.data) {
        localStorage.setItem("accessToken", refreshResult.data.access);
        result = await baseQuery(args, api, extra);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        api.dispatch(clearTokens());
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "UserInterest",
    "Topic",
    "Event",
    "EventType",
    "Team",
    "TeamParticipant",
    "TeamInvitation",
    "TextQuestion",
    "NumericQuestion",
    "ChoiceQuestion",
    "Choice",
    "TextAnswer",
    "NumericAnswer",
    "ChoiceAnswer",
    "Notification",
    "NotificationRecipient",
    "Channel",
    "Message",
    "EventInvitation",
    "FAQQuestion",
    "EventEditRequest",
    "Following",
    "Blocked",
  ],
  endpoints: () => ({}),
});
