import express from "express";
import {
  addDomain,
  getDomains,
  getDomainValues,
} from "../controllers/domain.controller.js";
import verifyToken from "../middleware.js";
const router = express.Router();

router.post("/", verifyToken, addDomain);
router.get("/", verifyToken, getDomains);
router.get("/:domainId/values", verifyToken, getDomainValues);

export default router;
