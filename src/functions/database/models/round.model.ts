import mongoose from "mongoose";

const RoundSchema = new mongoose.Schema({
  number: { type: Number },
  timeLeftInSeconds: { type: Number },
  playing: {type: Boolean},
  darkMode: {type: Boolean}
});

export default mongoose.models.Round || mongoose.model("Round", RoundSchema);
