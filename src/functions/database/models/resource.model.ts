import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: Number }
})

export default mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);
