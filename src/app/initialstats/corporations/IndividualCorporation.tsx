import { Button, Card, Col, Input, InputNumber, Row, Space } from "antd";
import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { InitialResourcesContext } from "../resources/InitialResourcesContext";
import { InitialCorporationContext } from "./InitialCorporationContext";
import { InitCorporation, Resource } from "@/types";

const IndividualCorporation = (props: InitCorporation) => {
  //get resources list from context
  const { resources } = useContext(InitialResourcesContext);
  //get deleters and updaters from context
  const { deleteCorporation, updateCorporation } = useContext(
    InitialCorporationContext
  );

  //create local corporation objects and setters
  const [corporationName, setCorporationName] = useState<string>(props.name);
  const [corporationResources, setCorporationResources] = useState<Resource[]>(
    props.resourcesOwned
  );

  //when resources are updated, update also locally
  useEffect(() => {
    //make a copy of current corp resources
    const newCorporationResources: Resource[] = JSON.parse(
      JSON.stringify(corporationResources)
    );

    //loop through all resources
    for (const resource of resources) {
      //check if resource is already in corp resources
      const resourceIndex = corporationResources
        .map((v) => v.name)
        .indexOf(resource);

      if (resourceIndex === -1)
        newCorporationResources.push({ name: resource, quantity: 0 });
    }

    //update corporation resources
    setCorporationResources(newCorporationResources);
  }, [resources, props.resourcesOwned]);

  //on corp name change -> update local name
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setCorporationName(event.target.value);

  //on update send -> request to context
  const handleUpdate = () =>
    updateCorporation(props.name, {
      ...props,
      name: corporationName,
      resourcesOwned: corporationResources,
    });

  return (
    <>
      <Row>
        <Col className="mr-5">Corporation Name</Col>
        <Col className="mr-5">
          <Input defaultValue={corporationName} onChange={handleNameChange} />
        </Col>
      </Row>

      <h4>Initial Resources</h4>

      <Row className="mb-5">
        {resources.map((resource, index) => {
          //inputValue will store the value in the input
          let inputValue = 0;

          //find resource index in the corporationResources vector
          const resourceIndex = corporationResources
            .map((v) => v.name)
            .indexOf(resource);

          //if exists, update quantity
          if (resourceIndex != -1)
            inputValue = corporationResources[resourceIndex].quantity;

          //on input change, update quantity of previously found index
          const onInputChange = (value: number | null) => {
            if (!value) return;
            const newResources: Resource[] = JSON.parse(
              JSON.stringify(corporationResources)
            );
            newResources[resourceIndex].quantity = value;
            setCorporationResources(newResources);
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
              deleteCorporation(props.name);
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default IndividualCorporation;
