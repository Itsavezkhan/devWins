import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching AI insights
export const fetchInsight = createAsyncThunk(
  "insights/fetchInsight",
  async (summaryInput: string, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5001/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: summaryInput }),
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch insight");
      }
      const data = await res.json();
      return data.insight;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
