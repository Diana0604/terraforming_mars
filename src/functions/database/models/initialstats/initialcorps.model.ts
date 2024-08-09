import mongoose from "mongoose";

const InitialCorporationSchema = new mongoose.Schema({
  name: { type: String },
  player: { type: Boolean },
  resourcesOwned: [
    {
      resource: { type: mongoose.Schema.Types.ObjectId, ref: "InitialResources" },
      quantity: { type: Number }
    },
  ],
});

export default mongoose.models.InitialCorporation ||
  mongoose.model("InitialCorporation", InitialCorporationSchema);
