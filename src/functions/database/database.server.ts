import mongoose from "mongoose";
import tileModel from "./models/tile.model";
import buildingModel from "./models/building.model";
import corporationModel from "./models/corporation.model";
import roundModel from "./models/round.model";
import initialbuildingModel from "./models/initialstats/initialbuilding.model";
import initialcorpsModel from "./models/initialstats/initialcorps.model";
import initialresourcesModel from "./models/initialstats/initialresources.model";
import initialstatsModel from "./models/initialstats/initialstats.model";
import alertModel from "./models/alert.model";
import resourceModel from "./models/resource.model";

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

    console.log("================== MONGOOSE CONNECTED ==================");

    // a first find is needed upon first connection due to a mongoose issue with model definitions
    // game models
    await alertModel.find();
    await buildingModel.find();
    await corporationModel.find();
    await resourceModel.find();
    await roundModel.find();
    await tileModel.find();
    
    // initial stats models
    await initialbuildingModel.find();
    await initialcorpsModel.find();
    await initialresourcesModel.find();
    await initialstatsModel.find();

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