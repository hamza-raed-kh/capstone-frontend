import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isLoggedIn: !!localStorage.getItem("accessToken"),
  user: null,
  isStaff: false,
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
    setUser: (state, action) => {
      state.user = action.payload;
      state.isStaff = action.payload.is_staff;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      state.user = null;
      state.isStaff = false;
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

export const { setTokens, clearTokens, setTheme, setInterests, setUser } = userSlice.actions;

export const selectTheme = (state) => state.user.theme;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectInterests = (state) => state.user.interests;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectRefreshToken = (state) => state.user.refreshToken;
export const selectUser = (state) => state.user.user;
export const selectIsStaff = (state) => state.user.isStaff;

export default userSlice.reducer;
