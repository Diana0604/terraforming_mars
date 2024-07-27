'use client'
//constants
import { PLAYER1_CORPORATION_NAME, PLAYER2_CORPORATION_NAME } from "@/fixtures/corporations.fixtures"

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
      label: PLAYER1_CORPORATION_NAME,
      children: buildChildren(PLAYER1_CORPORATION_NAME)
    },
    {
      key: 1,
      label: PLAYER2_CORPORATION_NAME,
      children: buildChildren(PLAYER2_CORPORATION_NAME)
    }
  ]

  return (<>
      <Collapse items={items} defaultActiveKey={[0, 1]} />
  </>)
}

export default CorporationStats