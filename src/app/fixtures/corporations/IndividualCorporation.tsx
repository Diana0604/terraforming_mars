import { Card, Col, Input, InputNumber, Row, Space } from "antd";

interface IndividualCorporationProps {
  name: string;
}

const IndividualCorporation = (props: IndividualCorporationProps) => {
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
        <Col style={{ marginRight: "5px" }}>
          <Space direction="vertical" size={16}></Space>
          <Card size="small" title="Water">
            <InputNumber />
          </Card>
        </Col>
        <Col style={{ marginRight: "5px" }}>
          <Space direction="vertical" size={16}></Space>
          <Card size="small" title="Rare Metal">
            <InputNumber />
          </Card>
        </Col>
        <Col style={{ marginRight: "5px" }}>
          <Space direction="vertical" size={16}></Space>
          <Card size="small" title="Oxygen">
            <InputNumber />
          </Card>
        </Col>
        <Col style={{ marginRight: "5px" }}>
          <Space direction="vertical" size={16}></Space>
          <Card size="small" title="Food">
            <InputNumber />
          </Card>
        </Col>
        <Col style={{ marginRight: "5px" }}>
          <Space direction="vertical" size={16}></Space>
          <Card size="small" title="Synthetics">
            <InputNumber />
          </Card>
        </Col>
        <Col style={{ marginRight: "5px" }}>
          <Space direction="vertical" size={16}></Space>
          <Card size="small" title="Minerals">
            <InputNumber />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default IndividualCorporation;
