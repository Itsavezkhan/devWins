import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import axios from "axios";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

export const CreateUser = async (req, res) => {
  try {
    const { githubId, name, email, avatar, accessToken } = req.body;

    if (!githubId || !name || !email) {
      return res
        .status(400)
        .json({ message: "Missing required GitHub user information" });
    }

    let user = await User.findOne({ githubId });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    user = await User.create({ githubId, name, email, avatar, accessToken });

    res.status(200).json({
      message: "GitHub login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const githubLogin = (req, res) => {
  const githubCallbackUrl = "http://localhost:5001/auth/login/github/callback";
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${githubCallbackUrl}&scope=user:email`;
  res.redirect(githubAuthUrl);
};

export const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const token = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = token.data.access_token;

    const { data: profile } = await axios.get("https://api.github.com/user", {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    let email = profile.email;
    if (!email) {
      const { data: emails } = await axios.get(
        "https://api.github.com/user/emails",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      email = emails.find((e) => e.primary).email;
    }
    let user = await User.findOne({ githubId: profile.id });
    if (!user) {
      user = await User.create({
        githubId: profile.id,
        username: profile.login,
        name: profile.name,
        email,
        avatar: profile.avatar_url,
        accessToken,
      });
    } else {
      user.accessToken = accessToken;
      user.avatar = profile.avatar_url;
      await user.save();
    }
    const tokenjwt = jwt.sign(
      { id: user._id, githubId: user.githubId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // res.json({ success: true, tokenjwt, user });
    console.log("Generated token at login:", tokenjwt);

    res.cookie("token", tokenjwt, {
      httpOnly: true,
      domain: "localhost",
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.redirect(`${FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    res.status(500).json({ message: "GitHub OAuth failed" });
  }
};

export const UserLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  res.json({ message: "Logout Successful" });
};
