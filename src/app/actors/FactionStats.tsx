
import { dbConnect } from "@/functions/database/database.server"
import factionModel from "@/functions/database/models/faction.model";
import { Faction } from "@/types";
import UpdateResource from "./UpdateResource"

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
            {resource.name}: {resource.quantity} <UpdateResource faction={faction.name} resource={resource.name} quantity={0} />
          </div>))
        }

      </div>
    </div>))}
  </>)
}

export default FactionStats