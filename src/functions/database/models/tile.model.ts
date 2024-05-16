import mongoose, { Schema } from "mongoose";

const TileSchema = new mongoose.Schema({
  row: { type: Number },
  column: { type: String },
  resources: [String],
  colonizedBy: { type: Schema.Types.ObjectId, ref: "Corporation" },
  buildings: [{ type: Schema.Types.ObjectId, ref: "Building"  || { type: Schema.Types.ObjectId, ref: "CustomBuilding" }}],
  resourcesAvailable: [{type: String}],
  hazards: [{type: String}],
  landmark: {type: String},
  destroyed: {type: Boolean}
});

export default mongoose.models.Tile || mongoose.model("Tile", TileSchema);
