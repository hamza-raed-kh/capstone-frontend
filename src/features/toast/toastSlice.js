import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    /**
     * Adds a new toast notification.
     * @param {Object} action.payload
     * @param {string} action.payload.message - The text to display.
     * @param {'success' | 'error' | 'info'} [action.payload.type='info'] - The type of toast.
     * @param {number} [action.payload.duration=3000] - Duration in ms.
     */
    addToast: (state, action) => {
      const id = Date.now();
      state.toasts.push({
        id,
        type: 'info',
        duration: 3000,
        ...action.payload,
      });
    },
    /**
     * Removes a toast by ID.
     */
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export const selectToasts = (state) => state.toast.toasts;

export default toastSlice.reducer;
