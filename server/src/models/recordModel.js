import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  owner: { type: String },
  recordController: { type: String },
});

export default mongoose.model("record", recordSchema);
