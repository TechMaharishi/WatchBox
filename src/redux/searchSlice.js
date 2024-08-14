import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../utils/Fetch"; // Importing options for Axios requests

// Initial state for the search slice
const initialState = {
  searchResults: [], // Array to hold the search results
  isLoading: false,  // Loading state
};

const base_url = "https://youtube-v31.p.rapidapi.com"; // Base URL for the API

// Async thunk to search by ID
export const searchById = createAsyncThunk("redux/searchById", async (url) => {
  try {
    const { data } = await axios.get(`${base_url}/${url}`, options); // Fetch data from API
    return data.items; // Return the fetched search results
  } catch (error) {
    console.log("error in searchById thunk"); // Log any errors
  }
});

// Create a slice for search with initial state and reducers
const searchSlice = createSlice({
  name: "search", // Slice name
  initialState, // Initial state
  reducers: {}, // No reducers defined in this slice
  extraReducers: (builder) => {
    builder
      .addCase(searchById.pending, (state) => {
        // Set loading state when the searchById request is pending
        state.isLoading = true;
      })
      .addCase(searchById.fulfilled, (state, { payload }) => {
        // Set search results and reset loading state when the request is fulfilled
        state.searchResults = payload;
        state.isLoading = false;
      })
      .addCase(searchById.rejected, (state) => {
        // Log error and reset loading state when the request is rejected
        state.isLoading = false;
        console.log("Search by ID request rejected");
      });
  },
});

export default searchSlice.reducer; // Export the reducer
