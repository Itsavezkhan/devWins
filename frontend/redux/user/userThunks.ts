import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL_PROD;


export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, {
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
