
import { dbConnect } from "@/functions/database/database.server"
import corporationModel from "@/functions/database/models/corporation.model";
import { Corporation } from "@/types";
import { Col, Row } from 'antd';
import { Collapse } from 'antd'
import ResourceStats from "./ResourceStats";
import MapStats from "./MapStats";

const CorporationStats = async () => {

  await dbConnect();

  const corporationStats: Corporation[] = await corporationModel.find()

  const items = corporationStats.map((corporation, index) => {

    const resourcesList = <ResourceStats resourcesOwned={corporation.resourcesOwned} corporationName={corporation.name} />

    const mapStats = <MapStats />

    const children = (<>
      <Row>
        <Col span={12}>{resourcesList}</Col>
        <Col span={12}>{mapStats}</Col>
      </Row>
    </>)

    return { key: index, label: corporation.name, children: children }
  })


  return (<>
    <h3 style={{ marginTop: '10px' }}>Corporation Stats</h3>

    <Collapse items={items} />
  </>)
}

export default CorporationStats