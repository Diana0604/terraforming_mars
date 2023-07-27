import mongoose from "mongoose";

const RoundSchema = new mongoose.Schema({
  number: { type: Number },
  timeLeftInSeconds: { type: Number },
});

export default mongoose.models.Round || mongoose.model("Round", RoundSchema);
