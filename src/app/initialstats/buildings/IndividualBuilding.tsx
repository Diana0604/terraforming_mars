import { Row, Col, Input } from "antd";
import { useContext, useState, useEffect } from "react";
import { InitialBuildingContext } from "./InitialBuildingContext";
import { BuildingConstant, Resource } from "@/types";
import { InitialResourcesContext } from "../resources/InitialResourcesContext";
import { updateFromResources } from "../initialstats.helpers";
import EditResourceStats from "../components/EditResourceStats";
import UpdateStat from "../components/UpdateStat";
import DeleteStat from "../components/DeleteStat";

const IndividualBuilding = (props: BuildingConstant) => {
  //get resources list from context
  const { resources } = useContext(InitialResourcesContext);

  //initial building context relevant
  const { deleteBuilding, updateBuilding } = useContext(InitialBuildingContext);

  // setters
  const [buildingType, setBuildingType] = useState<string>(props.buildingType);
  const [dailyCost, setDailyCost] = useState<Resource[]>(props.dailyCost);
  const [dailyProduction, setdailyProduction] = useState<Resource[]>(
    props.dailyProduction
  );
  const [buildingCost, setBuildingCost] = useState<Resource[]>(
    props.buildingCost
  );

  //update resources from resource list updates
  useEffect(() => {
    updateFromResources(resources, dailyCost, setDailyCost);
    updateFromResources(resources, dailyProduction, setdailyProduction);
    updateFromResources(resources, buildingCost, setBuildingCost);
  }, [resources, props.dailyCost, props.dailyProduction, props.buildingCost]);

  //on update send -> request to context
  const handleUpdate = () =>
    updateBuilding(props.buildingType, {
      ...props,
      buildingType: buildingType,
      dailyProduction: dailyProduction,
      dailyCost: dailyCost,
      buildingCost: buildingCost,
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
        <UpdateStat handleUpdate={handleUpdate} />
        <DeleteStat
          handleDelete={() => {
            deleteBuilding(props.buildingType);
          }}
        />
      </Row>
    </>
  );
};

export default IndividualBuilding;
