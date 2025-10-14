import express from "express";
import {
  getGithubData,
  getRepoAnalytics,
  getGithubCommits,
} from "../controllers/github.controller.js";
import verifyToken from "../middleware.js";
const router = express();

router.get("/githubdata", verifyToken, getGithubData);
router.post("/github/analytics/:repo", verifyToken, getRepoAnalytics);
router.get("/githubcommits/:username/:repo", verifyToken, getGithubCommits);
export default router;
