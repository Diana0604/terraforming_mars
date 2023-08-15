import mongoose from "mongoose";
import buildingModel from "@/functions/database/models/building.model";
import tileModel from "@/functions/database/models/tile.model";
import corporationModel from "@/functions/database/models/corporation.model";

//================== TO BE CALLED FROM SERVER SIDE ==================
export const dbConnect = async () => {
  if (!process.env.mongoUri) {
    throw Error("env variable MONGO_URI is not declared");
  }

  //return connection if exists
  if (mongoose.connection.readyState) {
    return mongoose.connection;
  }

  //connect to database and return connection
  try {
    await mongoose.connect(process.env.mongoUri);

    console.log("================== MONGOOSE CONNECTED ==================");
    await buildingModel.find();
    await tileModel.find();
    await corporationModel.find();

    console.log(
      "=================== MODELS DEFINED =========================="
    );
  } catch (error) {
    throw error;
  }
};
