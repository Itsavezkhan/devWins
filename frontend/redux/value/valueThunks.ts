import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDomainFieldValues = createAsyncThunk(
  "domain/fetchFieldValues",
  async (domainId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/domains/values/${domainId}`,
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
