import { Row, Col, Input, InputNumber, Space, Card } from "antd";

interface IndividualBuildingProps {
  name: string;
}

const IndividualBuilding = (props: IndividualBuildingProps) => {
  return (
    <>
      <Row>
        <Col style={{ width: "100px" }}>Building Name</Col>
        <Col>
          <Input defaultValue={props.name}></Input>
        </Col>
      </Row>
      <h4>Building Cost</h4>
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

      <h4>Daily Production</h4>
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

      <h4>Daily Cost</h4>
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

export default IndividualBuilding;
