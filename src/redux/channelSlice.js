import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../utils/Fetch";

const base_url = "https://youtube-v31.p.rapidapi.com"; // Base URL for the API

// Initial state for the channel slice
const initialState = {
  channelVideos: [], // Array to hold videos from the channel
  isLoading: false, // Loading state
  channelDetails: "", // Object to hold channel details
};

// Async thunk to fetch videos from a channel
export const getChannelVideos = createAsyncThunk(
  "redux/getChannelVideos", // Action type
  async (url) => {
    try {
      const { data } = await axios.get(`${base_url}/${url}`, options); // Fetch data from API
      return data.items; // Return fetched videos
    } catch (error) {
      console.log(error); // Log any errors
    }
  }
);

// Async thunk to fetch details of a channel
export const getChannelDetails = createAsyncThunk(
  "redux/getChannelDetails", // Action type
  async (url) => {
    try {
      const { data } = await axios.get(`${base_url}/${url}`, options); // Fetch data from API
      return data.items[0]; // Return the first item in the response
    } catch (error) {
      console.log("error in getChannelDetails thunk"); // Log any errors
    }
  }
);

export const channelSlice = createSlice({
  name: "channel", // Slice name
  initialState, // Initial state
  reducers: {}, // No reducers defined in this slice
  extraReducers: (builder) => {
    builder
      .addCase(getChannelVideos.pending, (state) => {
        // Set loading state when request is pending
        state.isLoading = true;
      })
      .addCase(getChannelVideos.fulfilled, (state, { payload }) => {
        // Set channel videos and reset loading state when request is fulfilled
        state.channelVideos = payload;
        state.isLoading = false;
      })
      .addCase(getChannelVideos.rejected, (state) => {
        // Log error and reset loading state when request is rejected
        console.log("Channel videos request rejected");
        state.isLoading = false;
      })
      .addCase(getChannelDetails.pending, (state) => {
        // Set loading state when request is pending
        state.isLoading = true;
      })
      .addCase(getChannelDetails.fulfilled, (state, { payload }) => {
        // Set channel details and reset loading state when request is fulfilled
        state.channelDetails = payload;
        state.isLoading = false;
      })
      .addCase(getChannelDetails.rejected, (state) => {
        // Log error and reset loading state when request is rejected
        console.log("Channel details request rejected");
        state.isLoading = false;
      });
  },
});

export default channelSlice.reducer; // Export reducer
