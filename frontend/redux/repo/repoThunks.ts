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
