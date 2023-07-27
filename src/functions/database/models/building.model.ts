import mongoose, { Schema } from "mongoose";

const BuildingSchema = new mongoose.Schema({
  buildingType: { type: String },
  tile: { type: Schema.Types.ObjectId, ref: "Tile" },
  owner: {type: Schema.Types.ObjectId, ref: "Corporation"}
});

export default mongoose.models.Building ||
  mongoose.model("Building", BuildingSchema);
