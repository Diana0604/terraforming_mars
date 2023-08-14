import mongoose from "mongoose";

const RoundSchema = new mongoose.Schema({
  number: { type: Number },
  playing: {type: Boolean},
  startTime: {type: Date},
  pausedAt: {type: Date},
  darkHour: {type: Boolean}
});

export default mongoose.models.Round || mongoose.model("Round", RoundSchema);
