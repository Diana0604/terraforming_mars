import mongoose, { Schema } from "mongoose";

const CorporationSchema = new mongoose.Schema({
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
  readyForNextRound: { type: Boolean }
});

export default mongoose.models.Corporation ||
  mongoose.model("Corporation", CorporationSchema);
