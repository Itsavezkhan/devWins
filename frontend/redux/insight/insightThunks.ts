import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = process.env.NEXT_PUBLIC_API_URL_PROD;


interface RepoStats {
  codeFreq: [number, number, number][]; // [week, additions, deletions]
  commits: any[];
  prs: any[];
  issues: any[];
}
// Async thunk for fetching AI insights
export const fetchInsight = createAsyncThunk(
  "insights/fetchInsight",
  async (summaryInput: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/insights`, {
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
export const fetchRepoInsight = createAsyncThunk(
  "insights/fetchRepoInsight",
  async (repoStats: RepoStats, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/insights/repoinsights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // include cookies/auth credentials
        body: JSON.stringify(repoStats),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch AI insight");
      }

      const data = await response.json();
      return data.insight; // assuming API responds with { insight: "..." }
    } catch (error: any) {
      console.error("Error fetching repo AI insight:", error.message);
      return rejectWithValue(error.message || "Failed to fetch AI insight");
    }
  }
);
