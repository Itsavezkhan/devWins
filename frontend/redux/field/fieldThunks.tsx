// src/redux/thunks/fieldThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Fetch fields by domainId
export const fetchFieldsByDomain = createAsyncThunk(
  "fields/fetchByDomain",
  async (domainId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/fields/${domainId}`,
        {
          withCredentials: true,
        }
      );
      return res.data; // expected to be an array of fields
    } catch (err: any) {
      console.error(err);
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch fields"
      );
    }
  }
);

export const addDailyFieldValues = createAsyncThunk(
  "fields/addDailyFieldValues",
  async (
    {
      domainId,
      values,
      date,
    }: {
      domainId: string;
      date: string;
      values: { fieldId: string; value: number }[];
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `http://localhost:5001/api/fields/values/${domainId}`,
        { values, date },
        { withCredentials: true }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
