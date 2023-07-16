import ResetButton from "./ResetButton"
import { dbConnect } from "@/functions/database/database.server"
import factionModel from "@/functions/database/models/faction.model";
import { Faction } from "@/types";

const ActorsPage = async () => {

  await dbConnect();

  const factionStats: Faction[] = await factionModel.find();


  return (<>
    <div>
      In here the actors can interact with the database
    </div>

    <ResetButton></ResetButton>
  </>)
}

export default ActorsPage