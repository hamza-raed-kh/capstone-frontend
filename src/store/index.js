import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import layoutReducer from "../features/layout/layoutSlice";
import filtersReducer from "../features/filters/filtersSlice";
import userReducer from "../features/user/userSlice";
import toastReducer from "../features/toast/toastSlice";
import competitionReducer from "../features/competition/competitionSlice";

/**
 * The main Redux store for the application.
 * This store is created and configured using `configureStore` from `@reduxjs/toolkit`.
 * It combines the reducers from different features and includes middleware for handling
 * asynchronous actions, such as those from the `apiSlice`.
 *
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    layout: layoutReducer,
    filters: filtersReducer,
    user: userReducer,
    toast: toastReducer,
    competition: competitionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
