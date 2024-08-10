import { Row, Col, Input, InputNumber, Space, Card, Button } from "antd";
import {
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { InitialBuildingContext } from "./InitialBuildingContext";
import { BuildingConstant, Resource } from "@/types";
import { InitialResourcesContext } from "../resources/InitialResourcesContext";
import { updateFromResources } from "../initialstats.helpers";
import EditResourceStats from "../components/EditResourceStats";

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
      <h4>Building Cost</h4>
      <Row>
        <EditResourceStats
          resources={resources}
          resourceList={buildingCost}
          setter={setBuildingCost}
        />
      </Row>

      <h4>Daily Production</h4>
      <Row>
        <EditResourceStats
          resources={resources}
          resourceList={dailyProduction}
          setter={setdailyProduction}
        />
      </Row>

      <h4>Daily Cost</h4>
      <Row>
        <EditResourceStats
          resources={resources}
          resourceList={dailyCost}
          setter={setDailyCost}
        />
      </Row>

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
