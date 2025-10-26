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

// const UserSchema = new mongoose.Schema(
//   {
//     githubId: { type: String, unique: true, sparse: true, default: null},
//     googleId: { type: String, unique: true, sparse: true, default: null },

//     username: { type: String },
//     name: { type: String },
//     email: { type: String },
//     avatar: { type: String },
//     githubAccessToken: { type: String },
//     githubConnected: { type: Boolean },

//     provider: { type: String, enum: ["github", "google"] },
//   },
//   { timestamps: true }
// );
const UserSchema = new mongoose.Schema(
  {
    githubId: { type: String, unique: true, sparse: true, default: null },
    googleId: { type: String, unique: true, sparse: true, default: null },

    username: { type: String },
    name: { type: String },
    email: { type: String, unique: true, required: true }, // ✅ add unique + required

    avatar: { type: String },
    githubAccessToken: { type: String },
    githubConnected: { type: Boolean, default: false },

    provider: { type: String, enum: ["github", "google"], required: true },
  },
  { timestamps: true }
);


const User = mongoose.model("User", UserSchema);

export default User;
