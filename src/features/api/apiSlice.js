import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * An API slice created with Redux Toolkit's `createApi` function.
 * This slice is responsible for all API interactions in the application.
 * It is configured with a `baseQuery` that uses `fetchBaseQuery` to make requests
 * to the specified `baseUrl`.
 *
 * @type {import('@reduxjs/toolkit/query/react').Api<any, any, string, string, any>}
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: [],
  endpoints: (builder) => ({
    // get_: builder.query({
    //   query: () => "",
    //   providesTags: [],
    // }),
  }),
});

export const { } = apiSlice;
