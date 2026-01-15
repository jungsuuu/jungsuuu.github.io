import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Add demo auth header
  config.headers["x-demo-auth"] = "super-admin";

  // Log request in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  }

  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Unwrap data from response
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // Normalize error format
    if (error.response?.data) {
      return Promise.reject({
        code: error.response.data.code || "ERROR",
        message: error.response.data.message || "An error occurred",
        status: error.response.status,
      });
    }

    if (error.message) {
      return Promise.reject({
        code: "NETWORK_ERROR",
        message: error.message,
      });
    }

    return Promise.reject({
      code: "UNKNOWN_ERROR",
      message: "An unknown error occurred",
    });
  },
);

export default axiosInstance;
