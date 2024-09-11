"use client";
//types
import { Resource } from "@/types";

//react
import { useContext, useEffect, useState } from "react";

import { Button, Col, Divider, Input, Row } from "antd";
import { InitialBuildingContext } from "../../../contexts/InitialBuildingContext";
import EditResourceStats from "@/app/initialstats/components/EditResourceStats";
import { updateFromResources } from "@/app/initialstats/initialstats.helpers";
import { InitialResourcesContext } from "../../../contexts/InitialResourcesContext";
import Title from "antd/lib/typography/Title";

const CustomBuilding = () => {
  //get resources list from context
  const { resources } = useContext(InitialResourcesContext);

  //initial building context relevant
  const { addCustomBuilding } = useContext(InitialBuildingContext);

  // setters
  const [buildingType, setBuildingType] = useState<string>("");
  const [dailyCost, setDailyCost] = useState<Resource[]>([]);
  const [dailyProduction, setdailyProduction] = useState<Resource[]>([]);
  const [buildingCost, setBuildingCost] = useState<Resource[]>([]);

  //update resources from resource list updates at beginning
  useEffect(() => {
    updateFromResources(resources, dailyCost, setDailyCost);
    updateFromResources(resources, dailyProduction, setdailyProduction);
    updateFromResources(resources, buildingCost, setBuildingCost);
  }, [resources]);

  //on update send -> request to context
  const handleUpdate = () => {
    addCustomBuilding({
      buildingType,
      dailyProduction,
      dailyCost,
      buildingCost,
    });

    //reload window
    window.location.reload();
  };

  return (
    <>
      <Title level={4}>Custom Building</Title>
      <Divider />
      <Row>
        <Col style={{ width: "100px" }}>Building Name</Col>
        <Col>
          <Input
            value={buildingType}
            onChange={(event) => setBuildingType(event.target.value)}
          />
        </Col>
      </Row>
      <EditResourceStats
        title="Building Cost"
        resources={resources}
        resourceList={buildingCost}
        setter={setBuildingCost}
      />

      <EditResourceStats
        title="Daily Production"
        resources={resources}
        resourceList={dailyProduction}
        setter={setdailyProduction}
      />

      <EditResourceStats
        title="Daily Cost"
        resources={resources}
        resourceList={dailyCost}
        setter={setDailyCost}
      />

      <Row>
        <Button onClick={handleUpdate}>Create</Button>
      </Row>
    </>
  );
};

export default CustomBuilding;
