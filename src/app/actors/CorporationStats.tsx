
import { dbConnect } from "@/functions/database/database.server"
import corporationModel from "@/functions/database/models/corporation.model";
import { Corporation } from "@/types";
import UpdateResource from "./UpdateResource"

const CorporationStats = async () => {

  await dbConnect();

  const corporationStats: Corporation[] = await corporationModel.find()

  return (<>
    {corporationStats.map((corporation, index) => (<div key={index}>
      <div style={{ fontWeight: "bold" }}>Name: {corporation.name}</div>
      <div>
        Resources:
        {
          corporation.resourcesOwned.map((resource, index) => (<div key={index}>
            {resource.name}: {resource.quantity} <UpdateResource corporation={corporation.name} resource={resource.name} quantity={0} />
          </div>))
        }

      </div>
    </div>))}
  </>)
}

export default CorporationStats