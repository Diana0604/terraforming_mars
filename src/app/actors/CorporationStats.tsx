
import { dbConnect } from "@/functions/database/database.server"
import corporationModel from "@/functions/database/models/corporation.model";
import { Corporation } from "@/types";
import UpdateResource from "./UpdateResource"
import { Collapse } from 'antd'

const CorporationStats = async () => {

  await dbConnect();

  const corporationStats: Corporation[] = await corporationModel.find()

  const items = corporationStats.map((corporation, index) => {

    const resourcesList = corporation.resourcesOwned.map((resource, index) => (
      <div key={index}>
        {resource.name}: {resource.quantity}
        <UpdateResource corporation={corporation.name} resource={resource.name} quantity={0}></UpdateResource>
      </div>
    ))

    return { key: index, label: corporation.name, children: resourcesList }
  })


  return (<>
    <h3 style={{ marginTop: '10px' }}>Corporation Stats</h3>

    <Collapse items={items} />
  </>)
}

export default CorporationStats