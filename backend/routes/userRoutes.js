import express from "express";
import {
  CreateUser,
  githubCallback,
  githubLogin,
  googleCallback,
  googleLogin,
  UserLogout,
  getCurrentUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/create", CreateUser);
router.post("/logout", UserLogout);
router.get("/login/github", githubLogin);
router.get("/login/google", googleLogin);
router.get("/login/github/callback", githubCallback);
router.get("/me", getCurrentUser);
router.get("/login/google/callback", googleCallback);

export default router;
