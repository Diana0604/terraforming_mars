import mongoose, { Schema } from "mongoose";

const FactionSchema = new mongoose.Schema({
  name: { type: String },
  resourcesOwned: [
    {
      name: { type: String },
      quantity: { type: String },
    },
  ],
  colonizedHex: [{ type: Schema.Types.ObjectId, ref: "Tile" }],
});

export default mongoose.models.Faction ||
  mongoose.model("Faction", FactionSchema);
