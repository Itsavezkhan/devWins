import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Domain",
    required: true,
  },
});


export default mongoose.model("Field", FieldSchema);
