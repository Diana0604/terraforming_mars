import mongoose from "mongoose";

const InitialResourcesSchema = new mongoose.Schema({
  name: { type: String }
})

export default mongoose.models.InitialResources || mongoose.model("InitialResources", InitialResourcesSchema);
