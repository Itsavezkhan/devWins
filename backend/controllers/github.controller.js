// import axios from "axios";

// export const getGithubData = async (req, res) => {
//   try {
//     const user = req.user;
//     const accessToken = user.accessToken;
//     if (!accessToken) {
//       return res.status(400).json({ message: "No GitHub access token found" });
//     }

//     const headers = { Authorization: `token ${accessToken}` };
//     const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

//     const [
//       profile,
//       userRepos,
//       commitActivity,
//       punchCard,
//       contributors,
//       codeFrequency,
//       languages,
//       trafficViews,
//       trafficClones,
//       issues,
//       pulls,
//       compareBranches,
//       actionsRuns,
//       participation,
//       commits,
//     ] = await Promise.allSettled([
//       axios.get(`https://api.github.com/user/repos`, { headers }),
//       axios.get(`${baseUrl}/stats/commit_activity`, { headers }),
//       axios.get(`${baseUrl}/stats/punch_card`, { headers }),
//       axios.get(`${baseUrl}/contributors`, { headers }),
//       axios.get(`${baseUrl}/stats/code_frequency`, { headers }),
//       axios.get(`${baseUrl}/languages`, { headers }),
//       axios.get(`${baseUrl}/traffic/views`, { headers }),
//       axios.get(`${baseUrl}/traffic/clones`, { headers }),
//       axios.get(`${baseUrl}/issues?state=all`, { headers }),
//       axios.get(`${baseUrl}/pulls?state=all`, { headers }),
//       axios.get(`${baseUrl}/compare/main...dev`, { headers }), // example base/head
//       axios.get(`${baseUrl}/actions/runs`, { headers }),
//       axios.get(`${baseUrl}/stats/participation`, { headers }),
//       axios.get(`${baseUrl}/commits`, { headers }),
//     ]);

//     const result = {
//       user: {
//         name: profile.data.name,
//         username: profile.data.login,
//         avatar: profile.data.avatar_url,
//         email: profile.data.email,
//       },
//       repo: `${owner}/${repo}`,
//       userRepos: userRepos.value?.data ?? [],
//       commitActivity: commitActivity.value?.data ?? [],
//       punchCard: punchCard.value?.data ?? [],
//       contributors: contributors.value?.data ?? [],
//       codeFrequency: codeFrequency.value?.data ?? [],
//       languages: languages.value?.data ?? {},
//       traffic: {
//         views: trafficViews.value?.data ?? {},
//         clones: trafficClones.value?.data ?? {},
//       },
//       issues: issues.value?.data ?? [],
//       pulls: pulls.value?.data ?? [],
//       compareBranches: compareBranches.value?.data ?? {},
//       actionsRuns: actionsRuns.value?.data ?? {},
//       participation: participation.value?.data ?? {},
//       commits: commits.value?.data ?? [],
//     };

//     res.json(result);
//   } catch (error) {
//     console.log("Github Data Error", error.message);
//     return res.status(400).json({ message: "Github Data fetching failed" });
//   }
// };
import axios from "axios";

export const getGithubData = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = user.accessToken;

    if (!accessToken) {
      return res.status(400).json({ message: "No GitHub access token found" });
    }

    const headers = { Authorization: `token ${accessToken}` };

    // Fetch user profile and repos in parallel
    const [profileRes, reposRes] = await Promise.all([
      axios.get("https://api.github.com/user", { headers }),
      axios.get("https://api.github.com/user/repos?per_page=100", { headers }),
    ]);

    // Format the response
    const result = {
      user: {
        name: profileRes.data.name,
        login: profileRes.data.login,
        avatar: profileRes.data.avatar_url,
        bio: profileRes.data.bio,
        email: profileRes.data.email,
      },
      repos: reposRes.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        updated_at: repo.updated_at,
        language: repo.language,
      })),
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("GitHub Data Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch GitHub data" });
  }
};

export const getRepoAnalytics = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = user.accessToken;
    const { repo } = req.params; // e.g. "my-repo"
    const { apis } = req.body; // e.g. ["commit_activity", "code_frequency"]

    if (!accessToken) {
      return res.status(401).json({ message: "Missing GitHub access token" });
    }

    if (!repo || !apis?.length) {
      return res
        .status(400)
        .json({ message: "Repo name and APIs are required" });
    }

    // Extract owner from GitHub username
    const owner = user.username || user.login;
    const headers = { Authorization: `token ${accessToken}` };

    const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

    // Map known endpoints
    const endpointMap = {
      commit_activity: `${baseUrl}/stats/commit_activity`,
      code_frequency: `${baseUrl}/stats/code_frequency`,
      punch_card: `${baseUrl}/stats/punch_card`,
      commits: `${baseUrl}/commits`,
      contributors: `${baseUrl}/contributors`,
      participation: `${baseUrl}/stats/participation`,
      "traffic/views": `${baseUrl}/traffic/views`,
      clones: `${baseUrl}/traffic/clones`,
      "actions/runs": `${baseUrl}/actions/runs`,
      issues: `${baseUrl}/issues?state=all`,
      pulls: `${baseUrl}/pulls?state=all`,
    };

    // Build requests based on APIs sent
    const requests = apis
      .map((api) => {
        const url = endpointMap[api];
        if (!url) return null;
        return axios.get(url, { headers });
      })
      .filter(Boolean);

    // Fetch all selected APIs concurrently
    const results = await Promise.allSettled(requests);

    // Prepare structured response
    const response = {};
    apis.forEach((api, i) => {
      response[api] = results[i]?.value?.data || null;
    });

    res.status(200).json(response);
  } catch (err) {
    console.error("GitHub Analytics Error:", err.message);
    res.status(500).json({ message: "Failed to fetch analytics data" });
  }
};

// export const getGithubCommits = async (req, res) => {
//   try {
//     const { username, repo } = req.params;

//     // GitHub API for commits
//     const response = await axios.get(
//       `https://api.github.com/repos/${username}/${repo}/commits`
//     );

//     // Count total commits (this returns last 30 by default)
//     const commitCount = response.data.length;

//     res.json({ commitCount });
//   } catch (error) {
//     console.error("Error fetching commits:", error.message);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch commits", error: error.message });
//   }
// };
export const getGithubCommits = async (req, res) => {
  try {
    const { username, repo } = req.params;

    const response = await axios.get(
      `https://api.github.com/repos/${username}/${repo}/commits`
    );

    const commitCount = response.data.length;
    res.json({ commitCount });
  } catch (error) {
    // ✅ Handle empty repo (409) gracefully
    if (error.response?.status === 409) {
      return res.json({ commitCount: 0, message: "Repository is empty" });
    }

    // Other errors
    console.error("Error fetching commits:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch commits", error: error.message });
  }
};
