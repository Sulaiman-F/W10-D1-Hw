import axios from "axios";

const API_BASE_URL = "https://w9-d5-hw-obij.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: async (email, password) => {
    const response = await api.post("/auth/signup", { email, password });
    return response.data;
  },

  signin: async (email, password) => {
    const response = await api.post("/auth/signin", { email, password });
    return response.data;
  },

  signout: async () => {
    const response = await api.post("/auth/signout");
    return response.data;
  },
};

export const weatherAPI = {
  getCurrentWeather: async (lat, lon) => {
    const response = await api.get(`/weather?lat=${lat}&lon=${lon}`);
    return response.data;
  },
};

export default api;
