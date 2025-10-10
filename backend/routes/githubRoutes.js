import express from "express";
import {
  getGithubData,
  getRepoAnalytics,
} from "../controllers/github.controller.js";
import verifyToken from "../middleware.js";
const router = express();

router.get("/githubdata", verifyToken, getGithubData);
router.post("/github/analytics/:repo", verifyToken, getRepoAnalytics);

export default router;
