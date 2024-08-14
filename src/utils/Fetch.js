// Importing axios for making HTTP requests
import axios from "axios";

// Base URL for the YouTube API
const base_url = "https://youtube-v31.p.rapidapi.com";

// Configuration options for the API requests
export const options = {
  params: {
    maxResults: "51", // Maximum number of results to return from the API
  },
  headers: {
    "X-RapidAPI-Key": "c78f8c980amshaf7da78fe5cd592p1b0c8ajsn2824a76260b3", // Your RapidAPI key for authentication
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com", // The host for the YouTube API
  },
};

// Function to fetch data from the API
const fetchApi = async (url) => {
  try {
    // Making a GET request to the API with the provided URL and options
    const { data } = await axios.get(`${base_url}/${url}`, options);
    return data; // Returning the data from the response
  } catch (error) {
    // Logging an error message if the request fails
    console.log("error in fetch api");
  }
};

// Exporting the fetchApi function as the default export
export default fetchApi;
