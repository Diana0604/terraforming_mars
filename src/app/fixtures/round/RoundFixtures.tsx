import { Col, InputNumber, Row } from "antd";

const RoundFixtures = () => {
  return (
    <Row>
      <Col style={{ marginRight: "10px" }}>Hours: </Col>
      <Col style={{ marginRight: "5px" }}>
        <InputNumber></InputNumber>
      </Col>
      <Col style={{ marginRight: "10px" }}>Minutes: </Col>
      <Col style={{ marginRight: "5px" }}>
        <InputNumber></InputNumber>
      </Col>
      <Col style={{ marginRight: "10px" }}>Seconds: </Col>
      <Col style={{ marginRight: "5px" }}>
        <InputNumber></InputNumber>
      </Col>
    </Row>
  );
};

export default RoundFixtures;
