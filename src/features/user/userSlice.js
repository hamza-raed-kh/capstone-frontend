import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePicUrl: "https://i.pravatar.cc/150?u=omar",
  email: "hamza@example.com",
  firstName: "Hamza",
  lastName: "Raed",
  aboutMe:
    "Passionate developer and UI designer working on the next generation of web applications.",
  gender: "male",
  dateOfBirth: "2000-01-15",
  interests: ["tech", "sports"],
  theme: "light",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfilePicUrl: (state, action) => {
      state.profilePicUrl = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setAboutMe: (state, action) => {
      state.aboutMe = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setDateOfBirth: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setInterests: (state, action) => {
      state.interests = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    /**
     * Applies a bulk update of user profile fields.
     * Useful for pre-filling from an API response.
     */
    setUserProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    /**
     * Resets all user data back to the initial empty state.
     */
    resetUser: () => initialState,
  },
});

export const {
  setProfilePicUrl,
  setEmail,
  setFirstName,
  setLastName,
  setAboutMe,
  setGender,
  setDateOfBirth,
  setInterests,
  setTheme,
  setUserProfile,
  resetUser,
} = userSlice.actions;

/** Selectors */
export const selectUser = (state) => state.user;
export const selectProfilePicUrl = (state) => state.user.profilePicUrl;
export const selectEmail = (state) => state.user.email;
export const selectFirstName = (state) => state.user.firstName;
export const selectLastName = (state) => state.user.lastName;
export const selectAboutMe = (state) => state.user.aboutMe;
export const selectGender = (state) => state.user.gender;
export const selectDateOfBirth = (state) => state.user.dateOfBirth;
export const selectInterests = (state) => state.user.interests;
export const selectTheme = (state) => state.user.theme;

export default userSlice.reducer;
