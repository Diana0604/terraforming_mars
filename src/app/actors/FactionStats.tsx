
import { dbConnect } from "@/functions/database/database.server"
import factionModel from "@/functions/database/models/faction.model";
import { RESOURCES_LIST } from "@/constants";
import { Faction } from "@/types";

const FactionStats = async () => {

  await dbConnect();

  const factionStats: Faction[] = await factionModel.find()

  return (<>
    {factionStats.map((faction, index) => (<div key={index}>
      <div style={{ fontWeight: "bold" }}>Name: {faction.name}</div>
      <div>
        Resources:
        {
          faction.resourcesOwned.map((resource, index) => (<div key={index}>
            {resource.name}: {resource.quantity}
          </div>))
        }

      </div>
    </div>))}
  </>)
}

export default FactionStats