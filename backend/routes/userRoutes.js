import express from "express";
import {
  CreateUser,
  githubCallback,
  githubLogin,
  UserLogout,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/create", CreateUser);
router.post("/logout", UserLogout);
router.get("/login/github", githubLogin);
router.get("/login/github/callback", githubCallback);

export default router;
