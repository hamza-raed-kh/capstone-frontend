import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isLoggedIn: !!localStorage.getItem("accessToken"),
  theme: "light",
  interests: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isLoggedIn = true;
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setInterests: (state, action) => {
      state.interests = action.payload;
    },
  },
});

export const { setTokens, clearTokens, setTheme, setInterests } = userSlice.actions;

export const selectTheme = (state) => state.user.theme;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectInterests = (state) => state.user.interests;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectRefreshToken = (state) => state.user.refreshToken;

export default userSlice.reducer;
