import mongoose, { Schema } from "mongoose";

const TileSchema = new mongoose.Schema({
  row: { type: Number },
  column: { type: String },
  resources: [
    {
      name: { type: String },
      quantity: { type: String },
    },
  ],
  colonizedBy: { type: Schema.Types.ObjectId, ref: "Faction" },
});

export default mongoose.models.Tile || mongoose.model("Tile", TileSchema);
