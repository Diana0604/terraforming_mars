import mongoose from "mongoose";
import { BuildingSchema } from "./building.model";

const CustomBuilding = new mongoose.Schema({
  ...BuildingSchema.obj,
  dailyCost: [{ name: String, quantity: Number }],
  dailyProduction: [{ name: String, quantity: Number }],
});

export default mongoose.models.CustomBuilding ||
  mongoose.model("CustomBuilding", CustomBuilding);
