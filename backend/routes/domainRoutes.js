import express from "express";
import {
  addDomain,
  getDomains,
  getDomainValues,
} from "../controllers/domain.controller.js";
const router = express.Router();

router.post("/", addDomain);
router.get("/", getDomains);
router.get("/:domainId/values", getDomainValues);

export default router;
