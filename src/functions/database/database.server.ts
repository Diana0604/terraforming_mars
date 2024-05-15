import mongoose from "mongoose";
import buildingModel from "./models/building.model";
import tileModel from "./models/tile.model";
import corporationModel from "./models/corporation.model";
import { createAllTiles } from "./database.seeder";

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

    await mongoose.connection.db.dropDatabase();

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

  //check tiles exist and create them otherwise
  if (allTiles.length === 0) {
    allTiles = await createAllTiles();
  }

  //return
  return allTiles;
}