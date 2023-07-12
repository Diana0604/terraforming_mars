import mongoose from "mongoose";

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
  } catch (error) {
    throw error;
  }
};
