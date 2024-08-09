import mongoose from "mongoose";
import tileModel from "./models/tile.model";

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