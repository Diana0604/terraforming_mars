import { Button, Col, Collapse, CollapseProps, Input, Row } from "antd";
import IndividualBuilding from "./IndividualBuilding";
import { useContext, useState } from "react";
import { InitialBuildingContext } from "../../../contexts/InitialBuildingContext";
import HasChangedContextProvider from "@/contexts/HasChangedContext";

const BuildingStats = () => {
  //get buildings from context
  const { buildings, addBuilding } = useContext(InitialBuildingContext);

  const [buildingType, setBuildingType] = useState<string>("");

  //convert building into collapsible items
  const items: CollapseProps["items"] = buildings.map((value, index) => {
    return {
      key: index,
      label: value.buildingType,
      children: <HasChangedContextProvider><IndividualBuilding {...value} /></HasChangedContextProvider>,
    };
  });

  return (
    <>
      <Collapse items={items} />

      {/* add new building */}
      <Row>
        <Col className="mr-5">
          <Input
            onChange={(event) => setBuildingType(event.target.value)}
            value={buildingType}
          />
        </Col>
        <Col>
          <Button onClick={() => addBuilding(buildingType)}>
            Add Building
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default BuildingStats;
