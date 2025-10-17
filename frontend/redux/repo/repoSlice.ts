// src/redux/repoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReposWithCommits } from "./repoThunks";

interface Repo {
  id: number;
  name: string;
  url: string;
  description: string;
  stars: number;
  updated_at: string;
  language: string;
  commits: number;
}

interface RepoState {
  topRepos: Repo[];
  totalCommits: number;
  loading: boolean;
  error: string | null;
}
const initialState: RepoState = {
  topRepos: [],
  totalCommits: 0,
  loading: false,
  error: null,
};

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReposWithCommits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReposWithCommits.fulfilled, (state, action) => {
        state.loading = false;
        state.topRepos = action.payload.topRepos;
        state.totalCommits = action.payload.totalCommits;
      })
      .addCase(fetchReposWithCommits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reposSlice.reducer;
