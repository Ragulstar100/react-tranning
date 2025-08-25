import { configureStore, createSlice } from '@reduxjs/toolkit';

// A slice for managing the theme state.
// It has a single reducer to toggle between 'light' and 'dark'.
const themeSlice = createSlice({
    name: 'theme',
    initialState: {
      mode: 'light',
    },
    reducers: {
      toggleTheme: (state) => {
        state.mode = state.mode === 'light' ? 'dark' : 'light';
      },
    },
  });


// ============================================================================
// 1. Redux Setup
// ============================================================================

// The Redux store configuration.
// We are only including the theme slice for this example.
export const themeStore = configureStore({
    reducer: {
      theme: themeSlice.reducer,
    },
  });

export const { toggleTheme } = themeSlice.actions;
