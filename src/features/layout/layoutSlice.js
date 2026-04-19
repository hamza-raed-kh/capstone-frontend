import { createSlice } from '@reduxjs/toolkit';

const isMobileInitial = typeof window !== 'undefined' && window.innerWidth <= 1024;

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    leftMinimized: isMobileInitial,
    rightMinimized: isMobileInitial,
  },
  reducers: {
    toggleLeftSidebar: (state) => {
      state.leftMinimized = !state.leftMinimized;
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
      if (isMobile && !state.leftMinimized) {
        state.rightMinimized = true;
      }
    },
    toggleRightSidebar: (state) => {
      state.rightMinimized = !state.rightMinimized;
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
      if (isMobile && !state.rightMinimized) {
        state.leftMinimized = true;
      }
    },
    setLeftMinimized: (state, action) => {
      state.leftMinimized = action.payload;
    },
    setRightMinimized: (state, action) => {
      state.rightMinimized = action.payload;
    }
  }
});

export const { toggleLeftSidebar, toggleRightSidebar, setLeftMinimized, setRightMinimized } = layoutSlice.actions;
export default layoutSlice.reducer;
