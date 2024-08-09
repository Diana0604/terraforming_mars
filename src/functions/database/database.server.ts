import mongoose from "mongoose";
import buildingModel from "./models/building.model";
import tileModel from "./models/tile.model";
import corporationModel from "./models/corporation.model";
import initialresourcesModel from "./models/initialstats/initialresources.model";
import initialcorpsModel from "./models/initialstats/initialcorps.model";

//================== TO BE CALLED FROM SERVER SIDE ==================
export const dbConnect = async () => {
  if (!process.env.MONGO_URI) {
    throw Error("env variable MONGO_URI is not declared");
  }

  //return connection if exists
  if (mongoose.connection.readyState) {
    return mongoose.connection;
  }

  //connect to database and return connection
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await mongoose.connection.db.dropDatabase();

    console.log("================== MONGOOSE CONNECTED ==================");
    await buildingModel.find();
    await tileModel.find();
    await corporationModel.find();
    await initialresourcesModel.find();
    await initialcorpsModel.find();

    console.log(
      "=================== MODELS DEFINED =========================="
    );
  } catch (error) {
    throw error;
  }
};

export const closeDatabase = async () => {
  mongoose.connection.close();
}

export const getAllTiles = async (populated?: boolean) => {
  let allTiles;

  //get tiles depending on population needs
  if (populated) {
    allTiles = await tileModel.find().populate("buildings").populate("colonizedBy");
  } else {
    allTiles = await tileModel.find();
  }

  //return
  return allTiles;
}