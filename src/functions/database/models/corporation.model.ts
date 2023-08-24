import mongoose, { Schema } from "mongoose";

const CorporationSchema = new mongoose.Schema({
  name: { type: String },
  resourcesOwned: [
    {
      name: { type: String },
      quantity: { type: String },
    },
  ],
  buildingsOwned: [{ type: Schema.Types.ObjectId, ref: "Building" } || { type: Schema.Types.ObjectId, ref: "CustomBuilding" }] ,
  resourcesNextRound: [
    {
      name: { type: String },
      quantity: { type: String },
    },
  ],
  newBuildingsNextRound: [{ type: Schema.Types.ObjectId, ref: "Building" }],
  tilesCanBuild: [{ type: Schema.Types.ObjectId, ref: "Tile" }],
});

export default mongoose.models.Corporation ||
  mongoose.model("Corporation", CorporationSchema);
