'use client'
//constants
import { ACTORS_CORPORATION_NAME, PLAYER_CORPORATION_NAME } from "@/showVariables"

//antd
import { Col, Collapse, Row } from "antd";

//components
import ResourceStats from "./ResourceStats";
import BuildingStats from "./BuildingStats";


/**
 * Stats display of all playing corporations
 */
const CorporationStats = () => {

  //build children elements for each collapsible in the collapse
  const buildChildren = (corporationName: string) => (<>
    <Row>
      <Col span={12}>
        <ResourceStats corporationName={corporationName} />
      </Col>
      <Col span={12}>
        <BuildingStats corporationName={corporationName}/>
      </Col>
    </Row>
  </>)

  //build items array for Collapse
  const items = [
    {
      key: 0,
      label: PLAYER_CORPORATION_NAME,
      children: buildChildren(PLAYER_CORPORATION_NAME)
    },
    {
      key: 1,
      label: ACTORS_CORPORATION_NAME,
      children: buildChildren(ACTORS_CORPORATION_NAME)
    }
  ]

  return (<>
      <Collapse items={items} defaultActiveKey={[0, 1]} />
  </>)
}

export default CorporationStats