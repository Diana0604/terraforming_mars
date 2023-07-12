import { checkValidPosition } from "@/functions/map";
import mongoose, { Schema } from "mongoose";

const HexagonSchema = new mongoose.Schema({
  coordinates: {
    column: String,
    row: Number,
    validate: {
      validator: checkValidPosition,
    },
  },
  resources: [
    {
      name: { type: String },
      quantity: { type: String },
    },
  ],
  colonizedBy: { type: Schema.Types.ObjectId, ref: "Faction" },
});

export default mongoose.models.Hexagon ||
  mongoose.model("Hexagon", HexagonSchema);
