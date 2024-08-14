import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importing necessary functions from Redux Toolkit
import axios from "axios"; // Importing axios for making HTTP requests
import { options } from "../utils/Fetch"; // Importing options for Axios requests

const base_url = "https://youtube-v31.p.rapidapi.com"; // Base URL for the YouTube API

// Initial state for the video slice
const initialState = {
  videoDetails: {}, // Object to hold details of a single video
  isLoading: false, // Boolean to represent loading state
  relatedVideos: [], // Array to hold related videos
};

// Async thunk to fetch video details by ID
export const getVideoDetails = createAsyncThunk(
  "redux/getVideoDetails", // Action type
  async (url) => {
    try {
      const { data } = await axios.get(`${base_url}/${url}`, options); // Fetch data from API
      return data.items[0]; // Return the first item from the response
    } catch (error) {
      console.log("error in getVideoDetails thunk"); // Log any errors
    }
  }
);

// Async thunk to fetch related videos by video ID
export const getRelatedVideos = createAsyncThunk(
  "redux/getRelatedVideos", // Action type
  async (url) => {
    try {
      const { data } = await axios.get(`${base_url}/${url}`, options); // Fetch data from API
      return data.items; // Return the items from the response
    } catch (error) {
      console.log("error in getRelatedVideos thunk"); // Log any errors
    }
  }
);

// Create a slice for video with initial state and reducers
const videoSlice = createSlice({
  name: "video", // Slice name
  initialState, // Initial state
  reducers: {}, // No reducers defined in this slice
  extraReducers: (builder) => {
    builder
      .addCase(getVideoDetails.pending, (state) => {
        // Set loading state when the getVideoDetails request is pending
        state.isLoading = true;
      })
      .addCase(getVideoDetails.fulfilled, (state, { payload }) => {
        // Set video details and reset loading state when the request is fulfilled
        state.videoDetails = payload;
        state.isLoading = false;
      })
      .addCase(getVideoDetails.rejected, (state) => {
        // Reset loading state when the request is rejected
        state.isLoading = false;
      })
      .addCase(getRelatedVideos.pending, (state) => {
        // Set loading state when the getRelatedVideos request is pending
        state.isLoading = true;
      })
      .addCase(getRelatedVideos.fulfilled, (state, { payload }) => {
        // Set related videos and reset loading state when the request is fulfilled
        state.relatedVideos = payload;
        state.isLoading = false;
      })
      .addCase(getRelatedVideos.rejected, (state) => {
        // Reset loading state when the request is rejected
        state.isLoading = false;
      });
  },
});

export default videoSlice.reducer; // Export the reducer
