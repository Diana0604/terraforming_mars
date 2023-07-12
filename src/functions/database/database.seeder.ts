import mongoose from "mongoose";
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