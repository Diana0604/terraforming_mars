import mongoose, { Schema } from "mongoose";

const InitialCorporationSchema = new mongoose.Schema({
  name: { type: String },
  player: { type: Boolean },
  resourcesOwned: [
    {
      name: { type: String },
      quantity: { type: Number },
      resourceId: { type: Number }
    },
  ],
  buildingsOwned: [{ type: Schema.Types.ObjectId, ref: "Building" }],
  resourcesNextRound: [
    {
      name: { type: String },
      quantity: { type: Number },
      resourceId: { type: Number }
    },
  ],
  newBuildingsNextRound: [{ type: Schema.Types.ObjectId, ref: "Building" }],
  tilesCanBuild: [{ type: Schema.Types.ObjectId, ref: "Tile" }],
});

export default mongoose.models.InitialCorporation ||
  mongoose.model("InitialCorporation", InitialCorporationSchema);
