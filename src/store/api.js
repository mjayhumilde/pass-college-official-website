import axios from "axios";

const apiUrl =
  import.meta.env.VITE_APP_ENV === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

console.log(apiUrl);

//axios instance
const api = axios.create({
  baseURL: `${apiUrl}`,
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
