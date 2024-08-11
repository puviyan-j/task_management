import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  details: { type: String },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  asignto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  status: { type: String, default: "new" },
});

export default mongoose.model("tasks", taskSchema);
