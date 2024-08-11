import { Col, InputNumber, Row } from "antd";
import { useState } from "react";

const RoundStats = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  return (
    <Row>
      <Col style={{ marginRight: "10px" }}>Hours: </Col>
      <Col style={{ marginRight: "5px" }}>
        <InputNumber
          value={hours}
          onChange={(value) => setHours(Number(value))}
        />
      </Col>
      <Col style={{ marginRight: "10px" }}>Minutes: </Col>
      <Col style={{ marginRight: "5px" }}>
        <InputNumber
          value={minutes}
          onChange={(value) => setMinutes(Number(value))}
        />
      </Col>
      <Col style={{ marginRight: "10px" }}>Seconds: </Col>
      <Col style={{ marginRight: "5px" }}>
        <InputNumber
          value={seconds}
          onChange={(value) => setSeconds(Number(value))}
        />
      </Col>
    </Row>
  );
};

export default RoundStats;
