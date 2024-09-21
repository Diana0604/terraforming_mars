import { Row } from "antd";
import { useEffect, useState } from "react";
import InputTime from "./components/InputTime";
import Title from "antd/es/typography/Title";
import UpdateStat from "../components/UpdateStat";
import { fetchGet, fetchPost } from "@/functions/database/database.fetchers";
import { INITSTATS_DARK_ALERT_ROUTE, INITSTATS_ROUTE } from "@/constants";

const RoundStats = () => {
  // // round minutes
  const [minutes, setMinutes] = useState<number>(0);

  // dark hour alert minutes
  const [darkMinutesAlert, setDarkMinutesAlert] = useState<number>(0);

  useEffect(() => {
    const callback = (data: {
      darkHourAlertBefore: any;
      secondsPerRound: any;
    }) => {
      setMinutes(Number(data.secondsPerRound) / 60);
      setDarkMinutesAlert(Number(data.darkHourAlertBefore) / 60);
    };

    fetchGet(INITSTATS_ROUTE, callback);
  }, []);

  const handleUpdate = () => {
    fetchPost(INITSTATS_ROUTE, {
      secondsPerRound: minutes * 60,
    });
    fetchPost(INITSTATS_DARK_ALERT_ROUTE, {
      darkHourAlertBefore: darkMinutesAlert * 60,
    });
  };

  return (
    <>
      <Row>
        <Title level={4}>Round Time in minutes</Title>
      </Row>
      <Row>
        {/* minutes */}
        <InputTime
          value={minutes}
          onChange={(value) => setMinutes(Number(value))}
        />
      </Row>

      {/*  */}
      <Row>
        <Title level={4}>Alert for Dark Hour before... (minutes)</Title>
      </Row>
      <Row>
        {/* minutes */}
        <InputTime
          value={darkMinutesAlert}
          onChange={(value) => setDarkMinutesAlert(Number(value))}
        />
      </Row>
      <Row>
        <UpdateStat handleUpdate={handleUpdate} />
      </Row>
    </>
  );
};

export default RoundStats;
