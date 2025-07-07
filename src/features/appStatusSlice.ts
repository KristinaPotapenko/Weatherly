import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const appStatus = createSlice({
  name: "appStatus",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const selectLoading = (state: RootState) => state.status.isLoading;
export const selectError = (state: RootState) => state.status.error;

export const { setLoading, setError, clearError } = appStatus.actions;
export default appStatus.reducer;
