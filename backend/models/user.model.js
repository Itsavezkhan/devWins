import express from "express";
import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     githubId: { type: String, required: true, unique: true },
//     username: { type: String, required: true },
//     name: { type: String },
//     email: { type: String },
//     avatar: { type: String },
//     accessToken: { type: String },
//   },
//   { timestamps: true }
// );

const UserSchema = new mongoose.Schema(
  {
    githubId: { type: String, unique: true, sparse: true },
    googleId: { type: String, unique: true, sparse: true },

    username: { type: String },
    name: { type: String },
    email: { type: String },
    avatar: { type: String },
    accessToken: { type: String },

    provider: { type: String, enum: ["github", "google"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
