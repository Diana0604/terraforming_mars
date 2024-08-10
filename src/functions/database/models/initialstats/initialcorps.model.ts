import mongoose from "mongoose";

const InitialCorporationSchema = new mongoose.Schema({
  name: { type: String },
  player: { type: Boolean },
  resourcesOwned: [
    {
      quantity: { type: Number },
      name: {type: String}
    },
  ],
});

export default mongoose.models.InitialCorporation ||
  mongoose.model("InitialCorporation", InitialCorporationSchema);
