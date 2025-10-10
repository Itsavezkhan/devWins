import express from "express";
import { addField, getFields } from "../controllers/field.controller.js";
const router = express.Router();

// field routes under /api/fields
router.post("/:domainId", addField);
router.get("/:domainId", getFields);

export default router;
