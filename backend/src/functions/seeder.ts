import mongoose from "mongoose";
import config from "../../next.config";

//================== TESTER SCHEMA FOR NOW ==================
const TesterSchema = new mongoose.Schema({
  name: String,
});

const TesterModel = mongoose.model("Tester", TesterSchema);

const testerSeed = [{ name: "foo" }, { name: "bar" }];

/**
 * Method to add all preset fixtures to database
 */
export const seedDB = async () => {
  await TesterModel.deleteMany({});
  await TesterModel.create(testerSeed);
  console.log("================== DATABASE SEEDED ==================");
};

//================== CONNECT TO DATABASE ==================

mongoose.connect(config.env.mongoUri).then(
  () => {
    //once conencted: seed database
    seedDB().then(
      () => {
        //once seeded -> disconnect and finish program
        mongoose.disconnect();
      },

      (error) => {
        //seed has failed -> disconnect and log error
        mongoose.disconnect();
        console.log(error);
      }
    );
  },

  (error) => {
    //connecting failed -> disconned and log error
    console.log(error);
  }
);
