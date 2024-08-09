import { Button, Card, Col, Input, InputNumber, Row, Space } from "antd";
import { ChangeEventHandler, useContext, useState } from "react";
import { InitialResourcesContext } from "../resources/InitialResourcesContext";
import { InitialCorporationContext } from "./InitialCorporationContext";
import { InitCorporation } from "@/types";

const IndividualCorporation = (props: InitCorporation) => {
  //get resources list from context
  const { resources } = useContext(InitialResourcesContext);
  //get deleters and updaters from context
  const { deleteCorporation, updateCorporation } = useContext(
    InitialCorporationContext
  );

  //create local corporation objects and setters
  const [corporationName, setCorporationName] = useState<string>(props.name);

  //on corp name change -> update local name
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setCorporationName(event.target.value);

  //on update send -> request to context
  const handleUpdate = () =>
    updateCorporation(props.name, { ...props, name: corporationName });

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
        {resources.map((value, index) => (
          <Col key={index} className="mr-5">
            <Space direction="vertical" size={16} />
            <Card size="small" title={value}>
              <InputNumber />
            </Card>
          </Col>
        ))}
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
