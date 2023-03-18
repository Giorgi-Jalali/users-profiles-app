import { createSlice, configureStore } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: { darkMode: false },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState: { isLoading: false },
  reducers: {
    isLoadingTrue(state) {
      state.isLoading = true;
    },
    isLoadingFalse(state) {
      state.isLoading = false;
    },
  },
});

const pageSlice = createSlice({
  name: "page",
  initialState: { page: 1 },
  reducers: {
    incrementPage(state) {
      state.page = state.page + 1;
    },
  },
});

const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
    isLoading: isLoadingSlice.reducer,
    page: pageSlice.reducer,
  },
});

export const darkModeAction = darkModeSlice.actions;
export const isLoadingAction = isLoadingSlice.actions;
export const pageAction = pageSlice.actions;

export default store;
