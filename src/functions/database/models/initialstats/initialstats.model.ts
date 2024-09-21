import mongoose from "mongoose";

const InitialStatsSchema = new mongoose.Schema({
  secondsPerRound: { type: Number },
  darkHourAlertBefore: { type: Number }
})

export default mongoose.models.InitalStats || mongoose.model("InitalStats", InitialStatsSchema);
