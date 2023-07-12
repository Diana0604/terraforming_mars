import mongoose, { Schema } from "mongoose";

const HexagonSchema = new mongoose.Schema({
  row: { type: Number },
  column: { type: String },
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
