import mongoose from "mongoose";

export const InitialBuildingSchema = new mongoose.Schema({
  buildingType: { type: String },
  buildingCost: [{ name: String, quantity: Number }],
  dailyCost: [{ name: String, quantity: Number }],
  dailyProduction: [{ name: String, quantity: Number }],
});

export default mongoose.models.InitialBuilding ||
  mongoose.model("InitialBuilding", InitialBuildingSchema);
