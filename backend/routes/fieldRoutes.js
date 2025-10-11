import express from "express";
import { addField, getFields } from "../controllers/field.controller.js";
import verifyToken from "../middleware.js";
const router = express.Router();

// field routes under /api/fields
router.post("/:domainId", verifyToken, addField);
router.get("/:domainId", verifyToken, getFields);

export default router;
