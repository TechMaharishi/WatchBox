import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../utils/Fetch";
import axios from "axios";

const base_url = "https://youtube-v31.p.rapidapi.com"; // Base URL for the API

// Initial state for the category slice
const initialState = {
  selectedCategory: "Home", // Default category
  categoryVideos: [], // Array to hold videos for the selected category
  isLoading: false, // Loading state
  sidebarExtend: false, // Sidebar visibility state
};

// Async thunk to fetch videos for a given category
export const getCategoryVideos = createAsyncThunk(
  "redux/categorySlice/getCategoryVideos", // Action type
  async (url) => {
    try {
      const { data } = await axios.get(`${base_url}/${url}`, options); // Fetch data from API
      return data.items; // Return fetched videos
    } catch (error) {
      console.log(error); // Log any errors
    }
  }
);

const categorySlice = createSlice({
  name: "category", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to set the selected category
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    // Reducer to set the sidebar extended value
    setSidebarExtendedValue: (state, { payload }) => {
      state.sidebarExtend = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryVideos.pending, (state) => {
        // Set loading state when request is pending
        state.isLoading = true;
      })
      .addCase(getCategoryVideos.fulfilled, (state, { payload }) => {
        // Set category videos and reset loading state when request is fulfilled
        state.categoryVideos = payload;
        state.isLoading = false;
      })
      .addCase(getCategoryVideos.rejected, (state) => {
        // Reset loading state when request is rejected
        state.isLoading = false;
      });
  },
});

export const { setSelectedCategory, setSidebarExtendedValue } = categorySlice.actions; // Export actions
export default categorySlice.reducer; // Export reducer
