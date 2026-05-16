import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentId: null,
};

const competitionSlice = createSlice({
  name: "competition",
  initialState,
  reducers: {
    setCurrentCompetition: (state, action) => {
      state.currentId = action.payload;
    },
    clearCurrentCompetition: (state) => {
      state.currentId = null;
    },
  },
});

export const { setCurrentCompetition, clearCurrentCompetition } = competitionSlice.actions;

export default competitionSlice.reducer;
