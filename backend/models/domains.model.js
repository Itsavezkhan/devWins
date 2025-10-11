import mongoose from "mongoose";

const DomainSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Domain", DomainSchema);
