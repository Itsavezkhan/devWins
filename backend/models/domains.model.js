import mongoose from "mongoose";

const DomainSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Domain", DomainSchema);
