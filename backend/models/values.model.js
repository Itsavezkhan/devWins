import mongoose from "mongoose";

const ValueSchema = new mongoose.Schema({
  fieldId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Field",
    required: true,
  },
  // date: {
  //   type: String,
  //   required: true,
  //   default: () => new Date().toISOString().split("T")[0],
  // },
  date: { type: String, required: true },
  value: { type: Number, required: true },
});

export default mongoose.model("Value", ValueSchema);
