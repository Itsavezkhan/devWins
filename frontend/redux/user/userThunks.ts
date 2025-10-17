import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5001/auth/me", {
        withCredentials: true,
      });

      return res?.data.user;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch user";
      return rejectWithValue(message);
    }
  }
);
