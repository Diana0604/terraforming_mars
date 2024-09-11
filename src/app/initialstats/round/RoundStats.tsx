import { Row } from "antd";
import { useEffect, useState } from "react";
import InputTime from "./components/InputTime";
import Title from "antd/es/typography/Title";
import UpdateStat from "../components/UpdateStat";
import {
  fetchGet,
  fetchPost,
} from "@/functions/database/database.fetchers";
import { INITSTATS_ROUTE } from "@/constants";

const RoundStats = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const callback = (data: { secondsPerRound: any }) =>
      setSeconds(Number(data.secondsPerRound));

    fetchGet(INITSTATS_ROUTE, callback);
  }, []);

  useEffect(() => {
    if (minutes < 60) return;

    // use modulo to calculate hours and minutes
    const newMins = minutes % 60;
    const addedHours = (minutes - newMins) / 60;

    // set minutes and hours
    setMinutes(newMins);
    setHours(hours + addedHours);
  }, [minutes, hours]);

  useEffect(() => {
    if (seconds < 60) return;

    // use modulo to calculate minutes and seconds
    const newSeconds = seconds % 60;
    const addedMinutes = (seconds - newSeconds) / 60;

    // set minutes and seconds
    setSeconds(newSeconds);
    setMinutes(minutes + addedMinutes);
  }, [seconds, minutes]);

  const handleUpdate = () => {
    const secondsPerRound = hours * 3600 + minutes * 60 + seconds;
    fetchPost(INITSTATS_ROUTE, { secondsPerRound });
  };

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
      <Row>
        <UpdateStat handleUpdate={handleUpdate} />
      </Row>
    </>
  );
};

export default RoundStats;
