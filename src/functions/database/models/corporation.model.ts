import mongoose, { Schema } from "mongoose";

const CorporationSchema = new mongoose.Schema({
  name: { type: String },
  resourcesOwned: [
    {
      name: { type: String },
      quantity: { type: String },
    },
  ],
  buildingsOwned: [
    {
      buildingType: { type: String },
      tile: { type: Schema.Types.ObjectId, ref: "Tile" },
    },
  ],
});

export default mongoose.models.Corporation ||
  mongoose.model("Corporation", CorporationSchema);
