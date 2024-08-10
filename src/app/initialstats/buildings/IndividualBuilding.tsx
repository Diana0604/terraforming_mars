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

const updateFromResources = (
  resources: string[],
  initialList: Resource[],
  setter: Dispatch<SetStateAction<Resource[]>>
) => {
  //make a copy of current resources list
  const newList: Resource[] = JSON.parse(JSON.stringify(initialList));

  //loop through all resources
  for (const resource of resources) {
    //check if resource is already in corp resources
    const resourceIndex = initialList.map((v) => v.name).indexOf(resource);

    if (resourceIndex === -1) newList.push({ name: resource, quantity: 0 });
  }

  //remove any resources in initialsList that may have been deleted
  let i = 0;
  while (newList[i]) {
    const corpResource = newList[i];

    const resourceIndex = resources.indexOf(corpResource.name);

    //if resource cannot be found in resources list, delete it
    if (resourceIndex === -1) newList.splice(i, 1);
    else i++;
  }

  //update corporation resources
  setter(newList);
};

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
        {resources.map((resource, index) => {
          //inputValue will store the value in the input
          let inputValue = 0;

          //find resource index in the buildingCost vector
          const resourceIndex = buildingCost
            .map((v) => v.name)
            .indexOf(resource);

          //if exists, update quantity
          if (resourceIndex != -1)
            inputValue = buildingCost[resourceIndex].quantity;

          //on input change, update quantity of previously found index
          const onInputChange = (value: number | null) => {
            if (!value) return;
            const newResources: Resource[] = JSON.parse(
              JSON.stringify(buildingCost)
            );
            newResources[resourceIndex].quantity = value;
            setBuildingCost(newResources);
          };

          return (
            <Col key={index} className="mr-5">
              <Space direction="vertical" size={16} />
              <Card size="small" title={resource}>
                <InputNumber value={inputValue} onChange={onInputChange} />
              </Card>
            </Col>
          );
        })}
      </Row>

      <h4>Daily Production</h4>
      <Row>
        {resources.map((resource, index) => {
          //inputValue will store the value in the input
          let inputValue = 0;

          //find resource index in the buildingCost vector
          const resourceIndex = dailyProduction
            .map((v) => v.name)
            .indexOf(resource);

          //if exists, update quantity
          if (resourceIndex != -1)
            inputValue = dailyProduction[resourceIndex].quantity;

          //on input change, update quantity of previously found index
          const onInputChange = (value: number | null) => {
            if (!value) return;
            const newResources: Resource[] = JSON.parse(
              JSON.stringify(dailyProduction)
            );
            newResources[resourceIndex].quantity = value;
            setdailyProduction(newResources);
          };

          return (
            <Col key={index} className="mr-5">
              <Space direction="vertical" size={16} />
              <Card size="small" title={resource}>
                <InputNumber value={inputValue} onChange={onInputChange} />
              </Card>
            </Col>
          );
        })}
      </Row>

      <h4>Daily Cost</h4>
      <Row>
        {resources.map((resource, index) => {
          //inputValue will store the value in the input
          let inputValue = 0;

          //find resource index in the dailyCost vector
          const resourceIndex = dailyCost.map((v) => v.name).indexOf(resource);

          //if exists, update quantity
          if (resourceIndex != -1)
            inputValue = dailyCost[resourceIndex].quantity;

          //on input change, update quantity of previously found index
          const onInputChange = (value: number | null) => {
            if (!value) return;
            const newResources: Resource[] = JSON.parse(
              JSON.stringify(dailyCost)
            );
            newResources[resourceIndex].quantity = value;
            setDailyCost(newResources);
          };

          return (
            <Col key={index} className="mr-5">
              <Space direction="vertical" size={16} />
              <Card size="small" title={resource}>
                <InputNumber value={inputValue} onChange={onInputChange} />
              </Card>
            </Col>
          );
        })}
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
