import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  input: String,
  insight: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Insight", insightSchema);
