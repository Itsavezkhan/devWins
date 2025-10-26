import { createSlice } from "@reduxjs/toolkit";
import { fetchInsight, fetchRepoInsight } from "./insightThunks";

const insightsSlice = createSlice({
  name: "insights",
  initialState: {
    insight: "",
    repoInsight: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsight.fulfilled, (state, action) => {
        state.loading = false;
        state.insight = action.payload;
      })
      .addCase(fetchInsight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(fetchRepoInsight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepoInsight.fulfilled, (state, action) => {
        state.loading = false;
        state.repoInsight = action.payload;
      })
      .addCase(fetchRepoInsight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default insightsSlice.reducer;
