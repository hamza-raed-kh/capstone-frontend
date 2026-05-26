import { apiSlice } from "./apiSlice";

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (params) => ({ url: "events/", params }),
      providesTags: ["Event"],
    }),
    getEvent: builder.query({
      query: (id) => `events/${id}/`,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: "events/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Event"],
    }),
    updateEvent: builder.mutation({
      query: (args) => {
        const isFd = args instanceof FormData
        const id = isFd ? args.get("id") : args.id
        const body = isFd ? args : (({ id: _, ...rest }) => rest)(args)
        return { url: `events/${id}/`, method: "PATCH", body }
      },
      invalidatesTags: (result, error, args) => {
        const id = args instanceof FormData ? args.get("id") : args.id
        return [{ type: "Event", id }, "Event"]
      },
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `events/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
    getEventTypes: builder.query({
      query: () => "event-types/",
      providesTags: ["EventType"],
    }),
    inviteToEvent: builder.mutation({
      query: ({ id, username }) => ({
        url: `events/${id}/invite/`,
        method: "POST",
        body: { username },
      }),
      invalidatesTags: ["EventInvitation"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventTypesQuery,
  useInviteToEventMutation,
} = eventApi;
