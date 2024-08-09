import { Button, Card, Col, Input, InputNumber, Row, Space } from "antd";
import { useContext } from "react";
import { InitialResourcesContext } from "../resources/InitialResourcesContext";
import { InitialCorporationContext } from "./InitialCorporationContext";

interface IndividualCorporationProps {
  name: string;
}

const IndividualCorporation = (props: IndividualCorporationProps) => {
  const { resources } = useContext(InitialResourcesContext);

  const { deleteCorporation } = useContext(InitialCorporationContext);

  return (
    <>
      <Row>
        <Col className="mr-5">Corporation Name</Col>
        <Col className="mr-5">
          <Input defaultValue={props.name}></Input>
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
        <Button
          danger
          onClick={() => {
            deleteCorporation(props.name);
          }}
        >
          Delete Corporation
        </Button>
      </Row>
    </>
  );
};

export default IndividualCorporation;
