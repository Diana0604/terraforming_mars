import mongoose from "mongoose";

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
});

export default mongoose.models.InitialCorporation ||
  mongoose.model("InitialCorporation", InitialCorporationSchema);
