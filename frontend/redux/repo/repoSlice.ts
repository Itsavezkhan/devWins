// src/redux/repoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReposWithCommits, fetchRepoDetails } from "./repoThunks";

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
interface RepoDetails {
  owner: string;
  repo: string;
  commits: any[];
  prs: any[];
  issues: any[];
  codeFreq: any[];
}

interface RepoState {
  topRepos: Repo[];
  totalCommits: number;
  repoDetails: RepoDetails | null;
  loading: boolean;
  error: string | null;
}
const initialState: RepoState = {
  topRepos: [],
  repoDetails: null,
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
      })
       .addCase(fetchRepoDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepoDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.repoDetails = action.payload;
      })
      .addCase(fetchRepoDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reposSlice.reducer;
