import { Row } from "antd";
import { useEffect, useState } from "react";
import InputTime from "./components/InputTime";
import Title from "antd/es/typography/Title";
import UpdateStat from "../components/UpdateStat";
import { fetchGet, fetchPost } from "@/functions/database/database.fetchers";
import { INITSTATS_ROUTE } from "@/constants";

const RoundStats = () => {
  // // round seconds
  const [seconds, setSeconds] = useState<number>(0);

  // dark hour alert seconds
  const [darkSecondsAlert, setDarkSecondsAlert] = useState<number>(0);

  useEffect(() => {
    const callback = (data: {
      darkHourAlertBefore: any;
      secondsPerRound: any;
    }) => {
      setSeconds(Number(data.secondsPerRound));
      setDarkSecondsAlert(Number(data.darkHourAlertBefore));
    };

    fetchGet(INITSTATS_ROUTE, callback);
  }, []);

  const handleUpdate = () => {
    fetchPost(INITSTATS_ROUTE, {
      secondsPerRound: seconds,
      darkHourAlertBefore: darkSecondsAlert,
    });
  };

  return (
    <>
      <Row>
        <Title level={4}>Round Time in seconds</Title>
      </Row>
      <Row>
        {/* seconds */}
        <InputTime
          value={seconds}
          onChange={(value) => setSeconds(Number(value))}
        />
      </Row>

      {/*  */}
      <Row>
        <Title level={4}>Alert for Dark Hour before... (seconds)</Title>
      </Row>
      <Row>
        {/* seconds */}
        <InputTime
          value={darkSecondsAlert}
          onChange={(value) => setDarkSecondsAlert(Number(value))}
        />
      </Row>
      <Row>
        <UpdateStat handleUpdate={handleUpdate} />
      </Row>
    </>
  );
};

export default RoundStats;
