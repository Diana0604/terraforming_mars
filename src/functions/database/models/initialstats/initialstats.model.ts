import mongoose from "mongoose";

const InitialStatsSchema = new mongoose.Schema({
  name: { type: String }
})

export default mongoose.models.InitalStats || mongoose.model("InitalStats", InitialStatsSchema);
