import { Card, Col, Input, InputNumber, Row, Space } from "antd";
import { useContext, useEffect } from "react";
import { InitialResourcesContext } from "../resources/InitialResourcesContext";

interface IndividualCorporationProps {
  name: string;
}

const IndividualCorporation = (props: IndividualCorporationProps) => {
  const { resources } = useContext(InitialResourcesContext);

  useEffect(() => {
    console.log('from corp stats', resources)
  }, [resources])

  return (
    <>
      <Row>
        <Col style={{ width: "140px" }}>Corporation Name</Col>
        <Col>
          <Input defaultValue={props.name}></Input>
        </Col>
      </Row>
      <h4>Initial Resources</h4>
      <Row>
        {resources.map((value, index) => (
          <Col key={index} className="mr-5">
            <Space direction="vertical" size={16} />
            <Card size="small" title={value}>
              <InputNumber />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default IndividualCorporation;
