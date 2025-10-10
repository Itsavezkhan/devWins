import express from "express";
import { addValue } from "../controllers/value.controller.js";
const router = express.Router();

// POST /api/values/:fieldId
router.post("/:fieldId", addValue);

export default router;
