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
        githubAccessToken: accessToken,
        githubConnected: true,
        provider: "github",
      });
    } else {
      user.githubAccessToken = accessToken;
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
    console.log("User after github login:", user);
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

export const googleLogin = (req, res) => {
  const githubCallbackUrl = "http://localhost:5001/auth/login/google/callback";
  const redirectUri =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: githubCallbackUrl,
      response_type: "code",
      scope: "email profile",
      access_type: "offline",
      prompt: "consent",
    }).toString();

  res.redirect(redirectUri);
};

export const googleCallback = async (req, res) => {
  const githubCallbackUrl = "http://localhost:5001/auth/login/google/callback";
  const code = req.query.code;
  if (!code) return res.status(400).json({ message: "Code not provided" });

  try {
    // Step 1️⃣ Exchange code for tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: githubCallbackUrl,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenResponse.data;
    const accessToken = tokenResponse.data.access_token;

    // Step 2️⃣ Get user info
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { id, name, email, picture } = userResponse.data;

    // Step 3️⃣ Check if user exists
    let user = await User.findOne({ googleId: id });
    if (!user) {
      // Step 4️⃣ Create new Google user
      user = await User.create({
        googleId: id,
        name,
        email,
        avatar: picture,
        provider: "google",
        // accessToken,
        githubAccessToken: null,
        githubConnected: false,
      });
    }

    // Step 5️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, googleId: user.googleId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // res.json({ success: true, tokenjwt, user });
    console.log("Generated token at login with google:", token);

    res.cookie("token", token, {
      httpOnly: true,
      domain: "localhost",
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    console.log("User after Google login:", user);
    res.redirect(`${FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Google authentication failed" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token; // read from cookie

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
