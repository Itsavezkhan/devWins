import express from "express";
import {
  addField,
  getFields,
  addDailyFieldValues,
} from "../controllers/field.controller.js";
import verifyToken from "../middleware.js";
const router = express.Router();

// field routes under /api/fields
router.post("/:domainId", verifyToken, addField);
router.get("/:domainId", verifyToken, getFields);
router.post("/values/:domainId", verifyToken, addDailyFieldValues);

export default router;
