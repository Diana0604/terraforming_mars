import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
    message: {type: String}
});

export default mongoose.models.Alert || mongoose.model("Alert", AlertSchema);