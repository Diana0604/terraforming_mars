import mongoose from "mongoose";

const RoundSchema = new mongoose.Schema({
  number: { type: Number },
  startTime: { type: Date },
  playing: {type: Boolean},
  darkHour: {type: Boolean}
});

export default mongoose.models.Round || mongoose.model("Round", RoundSchema);
