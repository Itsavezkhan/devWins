import express from "express";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    name: { type: String },
    email: { type: String },
    avatar: { type: String },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
