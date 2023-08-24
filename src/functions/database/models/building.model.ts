import mongoose, { Schema } from "mongoose";

export const BuildingSchema = new mongoose.Schema({
  buildingType: { type: String },
  tile: { type: Schema.Types.ObjectId, ref: "Tile" },
  owner: { type: Schema.Types.ObjectId, ref: "Corporation" },
  dailyCost: [{ name: String, quantity: Number }],
  dailyProduction: [{ name: String, quantity: Number }],
});

export default mongoose.models.Building ||
  mongoose.model("Building", BuildingSchema);
