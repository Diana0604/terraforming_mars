import mongoose from "mongoose";
import { seedDB } from "../functions/database/database.seeder";
import config from "../../next.config";

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
