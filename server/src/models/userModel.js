import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String },
  username: { type: String, unique: true },
  rol: { type: String },
});

export default mongoose.model("user", userSchema);
