import axios from "axios";

// Create axios instance with base settings
const api = axios.create({
  baseURL: "https://app.nocodb.com/api/v2/",
  headers: {
    "xc-token": "NgV2LjBgQRpw06slc4AO-J69CRWC81BJ5LprdQqi", // Use env variable
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export { api, fetcher };
