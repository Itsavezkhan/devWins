// src/redux/repoThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchReposWithCommits = createAsyncThunk(
//   "repos/fetchRepos",
//   async () => {
//     const res = await axios.get("http://localhost:5001/user/githubdata", {
//       withCredentials: true,
//     });
//     const username = res.data.user.login;
//     const repos = res.data.repos;

//     // Sort and get top 3
//     const topRepos = [...repos]
//       .sort(
//         (a, b) =>
//           new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
//       )
//       .slice(0, 3);

//     return topRepos; // 👈 this will be the payload
//   }
// );

export const fetchReposWithCommits = createAsyncThunk(
  "repos/fetchReposWithCommits",
  async (_, { rejectWithValue }) => {
    try {
      // 1️⃣ Get repos from your backend
      const res = await axios.get("http://localhost:5001/user/githubdata", {
        withCredentials: true,
      });
      const username = res.data.user.login;
      const repos = res.data.repos;

      // 2️⃣ Sort and get top 3
      const topRepos = [...repos]
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
        .slice(0, 3);

      // 3️⃣ Get commits for each top repo (via backend or GitHub API)
      const reposWithCommits = await Promise.all(
        topRepos.map(async (repo) => {
          // Assuming your backend has a commits endpoint, else use GitHub API directly
          const commitRes = await axios.get(
            `http://localhost:5001/user/githubcommits/${username}/${repo.name}`,
            { withCredentials: true }
          );
          return {
            ...repo,
            commits: commitRes.data.commitCount,
          };
        })
      );

      // 4️⃣ Calculate total commits
      const totalCommits = reposWithCommits.reduce(
        (acc, repo) => acc + repo.commits,
        0
      );

      return { topRepos: reposWithCommits, totalCommits };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const fetchReposWithCommits = createAsyncThunk(
//   "repos/fetchReposWithCommits",
//   async (_, { rejectWithValue }) => {
//     try {
//       // 1️⃣ Get repos from your backend
//       const res = await axios.get("http://localhost:5001/user/githubdata", {
//         withCredentials: true,
//       });

//       const username = res.data.user.login; // 👈 get GitHub username
//       const repos = res.data.repos;

//       // 2️⃣ Sort and get top 3
//       const topRepos = [...repos]
//         .sort(
//           (a, b) =>
//             new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
//         )
//         .slice(0, 3);

//       // 3️⃣ Get commits for each top repo
//       const reposWithCommits = await Promise.all(
//         topRepos.map(async (repo) => {
//           const commitRes = await axios.get(
//             `http://localhost:5001/user/githubcommits/${username}/${repo.name}`,
//             { withCredentials: true }
//           );
//           return {
//             ...repo,
//             commits: commitRes.data.commitCount, // backend returns count
//           };
//         })
//       );

//       // 4️⃣ Calculate total commits
//       const totalCommits = reposWithCommits.reduce(
//         (acc, repo) => acc + repo.commits,
//         0
//       );

//       return { topRepos: reposWithCommits, totalCommits };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

async function fetchStatsWithRetry(url: string, headers: any, maxRetries = 10, delay = 2000) {
  let attempts = 0;
  while (attempts < maxRetries) {
    const res = await axios.get(url, { headers });
    if (res.status === 200) return res.data; // data ready
    if (res.status === 202) {
      attempts++;
      await new Promise(r => setTimeout(r, delay)); // wait before retry
      continue;
    }
    throw new Error(`GitHub API returned ${res.status}`);
  }
  throw new Error("Stats not ready after multiple attempts");
}

export const fetchRepoDetails = createAsyncThunk(
  "repos/fetchRepoDetails",
  async ({ owner, repo, token }, { rejectWithValue }) => {
    const headers = { Authorization: `token ${token}` };
    const baseUrl = "https://api.github.com";

    try {
      // Poll commit_activity and code_frequency separately
      const [commits, prs, issues, codeFreq] = await Promise.all([
        fetchStatsWithRetry(`${baseUrl}/repos/${owner}/${repo}/stats/commit_activity`, headers),
        axios
          .get(`${baseUrl}/repos/${owner}/${repo}/pulls?state=all&per_page=30&sort=created&direction=desc`, { headers })
          .then(res => res.data),
        axios
          .get(`${baseUrl}/repos/${owner}/${repo}/issues?state=all&per_page=30&sort=created&direction=desc`, { headers })
          .then(res => res.data),
        fetchStatsWithRetry(`${baseUrl}/repos/${owner}/${repo}/stats/code_frequency`, headers),
      ]);

      return { owner, repo, commits, prs, issues, codeFreq };
    } catch (error: any) {
      console.error("Error fetching repo details:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);