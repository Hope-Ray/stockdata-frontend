import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://stockdata-backend.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Error in axios instance", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
