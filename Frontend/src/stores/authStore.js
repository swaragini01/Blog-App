import { create } from "zustand";
import axios from "axios";

// Grab the base URL dynamically from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async (userCredObj) => {
    try {
      //set loading true
      set({ loading: true, error: null });
      
      // Dynamic URL update using the base environment variable
      let res = await axios.post(`${API_BASE_URL}/common-api/login`, userCredObj, { withCredentials: true });
      
      //update state
      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload, //{message:"",payload:}
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || err.response?.data?.error || "Login failed",
      });
    }
  },
  logout: async () => {
    try {
      //set loading state
      set({ loading: true, error: null });
      
      // Dynamic URL update using the base environment variable
      await axios.get(`${API_BASE_URL}/common-api/logout`, { withCredentials: true });
      
      //update state
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || err.response?.data?.error || "Logout failed",
      });
    }
  },
  // restore login
  checkAuth: async () => {
    try {
      // Dynamic URL update using the base environment variable
      const res = await axios.get(`${API_BASE_URL}/common-api/check-auth`, { withCredentials: true });

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
    }
  },
}));
