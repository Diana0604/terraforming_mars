import { Row, Col, Input, InputNumber, Space, Card, Button } from "antd";
import { useContext, useState } from "react";
import { InitialBuildingContext } from "./InitialBuildingContext";
import { BuildingConstant } from "@/types";

const IndividualBuilding = (props: BuildingConstant) => {
  const { deleteBuilding, updateBuilding } = useContext(InitialBuildingContext);

  const [buildingType, setBuildingType] = useState<string>(props.buildingType);

  //on update send -> request to context
  const handleUpdate = () =>
    updateBuilding(props.buildingType, {
      ...props,
      buildingType: buildingType,
    });

  return (
    <>
      <Row>
        <Col style={{ width: "100px" }}>Building Name</Col>
        <Col>
          <Input
            value={buildingType}
            onChange={(event) => setBuildingType(event.target.value)}
          />
        </Col>
      </Row>
      <h4>Building Cost</h4>
      <Row></Row>

      <h4>Daily Production</h4>
      <Row></Row>

      <h4>Daily Cost</h4>
      <Row></Row>

      <Row>
        <Col className="mr-5">
          <Button onClick={handleUpdate} type="primary">
            Update
          </Button>
        </Col>

        <Col>
          <Button
            danger
            onClick={() => {
              deleteBuilding(props.buildingType);
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default IndividualBuilding;
