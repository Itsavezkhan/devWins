import express from "express";
import { getAIInsight } from "../controllers/insights.controller.js";
import { listGeminiModels, getRepoAIInsight } from "../controllers/insights.controller.js";
// import verifyToken from "../middleware.js";
import verifyToken from "../middleware.js";

const router = express.Router();

router.post("/insights", verifyToken, getAIInsight);
router.post("/insights/repoinsights", verifyToken, getRepoAIInsight);

router.get("/list-models", listGeminiModels);

export default router;
