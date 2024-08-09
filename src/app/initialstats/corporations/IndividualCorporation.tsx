import { Button, Card, Col, Input, InputNumber, Row, Space } from "antd";
import { ChangeEventHandler, useContext, useState } from "react";
import { InitialResourcesContext } from "../resources/InitialResourcesContext";
import { InitialCorporationContext } from "./InitialCorporationContext";
import { InitCorporation } from "@/types";

const IndividualCorporation = (props: InitCorporation) => {
  const { resources } = useContext(InitialResourcesContext);

  const [corporationName, setCorporationName] = useState<string>(props.name);

  const { deleteCorporation, updateCorporation } = useContext(
    InitialCorporationContext
  );

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setCorporationName(event.target.value);

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
