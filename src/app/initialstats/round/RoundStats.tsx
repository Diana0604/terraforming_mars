import { Col, InputNumber, Row } from "antd";
import { useEffect, useState } from "react";
import InputTime from "./components/InputTime";
import Title from "antd/es/typography/Title";

const RoundStats = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (minutes < 60) return;

    // use modulo to calculate hours and minutes
    const newMins = minutes % 60;
    const addedHours = (minutes - newMins) / 60;

    // set minutes and hours
    setMinutes(newMins);
    setHours(hours + addedHours);
  }, [minutes]);

  useEffect(() => {
    if (seconds < 60) return;

    // use modulo to calculate minutes and seconds
    const newSeconds = seconds % 60;
    const addedMinutes = (seconds - newSeconds) / 60;

    // set minutes and seconds
    setSeconds(newSeconds);
    setMinutes(hours + addedMinutes);
  }, [seconds]);

  return (
    <>
      <Row>
        <Title level={4}>Time (h:m:s)</Title>
      </Row>
      <Row>
        {/* hours */}
        <InputTime
          value={hours}
          onChange={(value) => setHours(Number(value))}
        />
        :&nbsp;
        {/* minutes */}
        <InputTime
          value={minutes}
          onChange={(value) => setMinutes(Number(value))}
        />
        :&nbsp;
        {/* seconds */}
        <InputTime
          value={seconds}
          onChange={(value) => setSeconds(Number(value))}
        />
      </Row>
    </>
  );
};

export default RoundStats;
