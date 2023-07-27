import mongoose, { Schema } from "mongoose";

const TileSchema = new mongoose.Schema({
  row: { type: Number },
  column: { type: String },
  resources: [String],
  colonizedBy: { type: Schema.Types.ObjectId, ref: "Corporation" },
});

export default mongoose.models.Tile || mongoose.model("Tile", TileSchema);
