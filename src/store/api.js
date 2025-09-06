import axios from "axios";

//axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
});

// attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default api;
