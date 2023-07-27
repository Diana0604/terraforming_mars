//types
import { Corporation } from "@/types";

//database
import { dbConnect } from "@/functions/database/database.server"
import corporationModel from "@/functions/database/models/corporation.model";

//ant design
import { Col, Row, Collapse } from 'antd';

//components
import ResourceStats from "./ResourceStats";
import BuildingStats from "./BuildingStats";

/**
 * Stats display of all playing corporations
 */
const CorporationStats = async () => {

  //make sure database is connected
  await dbConnect();

  //find all corporations in the database
  const corporationStats: Corporation[] = await corporationModel.find()

  //build corporation stats for each corporation
  const items = corporationStats.map((corporation, index) => {

    //resourcesList displays all resources and allows updating
    const resourcesList = <ResourceStats resourcesOwned={corporation.resourcesOwned} corporationName={corporation.name} />

    //buuildingStats displays all buildings and allows building new ones where space empty / colonized by self
    const buildingStats = <BuildingStats buildingsOwned={corporation.buildingsOwned} corporationName={corporation.name} corporationId={corporation._id.toString()} />

    //all displayed side by side
    const children = (<>
      <Row>
        <Col span={12}>{resourcesList}</Col>
        <Col span={12}>{buildingStats}</Col>
      </Row>
    </>)

    //return object ready for antdesign Collapse object to read
    return { key: index, label: corporation.name, children: children }
  })


  return (<>
    <h3 style={{ marginTop: '10px' }}>Corporation Stats</h3>

    <Collapse items={items} defaultActiveKey={[0, 1]} />
  </>)
}

export default CorporationStats