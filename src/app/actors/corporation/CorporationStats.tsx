
import { dbConnect } from "@/functions/database/database.server"
import corporationModel from "@/functions/database/models/corporation.model";
import { Corporation } from "@/types";
import { Collapse } from 'antd'
import ResourceStats from "./ResourceStats";

const CorporationStats = async () => {

  await dbConnect();

  const corporationStats: Corporation[] = await corporationModel.find()

  const items = corporationStats.map((corporation, index) => {

    const resourcesList = <ResourceStats resourcesOwned={corporation.resourcesOwned} corporationName={corporation.name} />

    return { key: index, label: corporation.name, children: resourcesList }
  })


  return (<>
    <h3 style={{ marginTop: '10px' }}>Corporation Stats</h3>

    <Collapse items={items} />
  </>)
}

export default CorporationStats