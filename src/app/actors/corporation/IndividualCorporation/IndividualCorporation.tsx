import { Row, Col } from "antd";
import BuildingStats from "../BuildingStats";
import ResourceStats from "./resources/ResourceStats";
import { useContext } from "react";
import { IndividualCorporationContext } from "../contexts/IndividualCorporationContext";

const IndividualCorporation = () => {
  const corporation = useContext(IndividualCorporationContext);

  return (
    <Row>
      <Col span={12}>
        <ResourceStats />
      </Col>
      <Col span={12}>
        <BuildingStats corporationName={corporation.name} />
      </Col>
    </Row>
  );
};

export default IndividualCorporation;
