import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topics: [],
  status: '',
  virtual: false,
  beforeDate: null,
  afterDate: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setVirtual: (state, action) => {
      state.virtual = action.payload;
    },
    setBeforeDate: (state, action) => {
      state.beforeDate = action.payload;
    },
    setAfterDate: (state, action) => {
      state.afterDate = action.payload;
    },
    resetFilters: () => {
      return initialState;
    }
  }
});

export const { 
  setTopics, 
  setStatus, 
  setVirtual, 
  setBeforeDate, 
  setAfterDate,
  resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
