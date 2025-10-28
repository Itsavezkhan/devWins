import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL_PROD;


export const fetchDomainFieldValues = createAsyncThunk(
  "domain/fetchFieldValues",
  async (domainId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/domains/values/${domainId}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch field values"
      );
    }
  }
);
