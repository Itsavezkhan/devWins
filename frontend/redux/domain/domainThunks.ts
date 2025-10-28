import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Domain } from "./domainSlice";
const API_URL = process.env.NEXT_PUBLIC_API_URL_PROD;


export const fetchDomains = createAsyncThunk<Domain[]>(
  "domain/fetchDomains",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/domains`, {
        withCredentials: true,
        headers: { "Cache-Control": "no-cache" },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error fetching domains");
    }
  }
);

export const addDomain = createAsyncThunk(
  "domain/addDomain",
  async (name: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/domains`,
        { name },
        { withCredentials: true }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error adding domain");
    }
  }
);
