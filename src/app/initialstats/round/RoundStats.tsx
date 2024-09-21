import { Row } from "antd";
import { useEffect, useState } from "react";
import InputTime from "./components/InputTime";
import Title from "antd/es/typography/Title";
import UpdateStat from "../components/UpdateStat";
import { fetchGet, fetchPost } from "@/functions/database/database.fetchers";
import { INITSTATS_DARK_ALERT_ROUTE, INITSTATS_ROUTE } from "@/constants";

const RoundStats = () => {
  // round times
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  // dark hour alert times
  const [darkHoursAlert, setDarkHoursAlert] = useState<number>(0);
  const [darkMinutesAlert, setDarkMinutesAlert] = useState<number>(0);
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
    if (darkMinutesAlert < 60) return;

    // use modulo to calculate hours and minutes
    const newMins = darkMinutesAlert % 60;
    const addedHours = (darkMinutesAlert - newMins) / 60;

    // set minutes and hours
    setDarkMinutesAlert(newMins);
    setDarkHoursAlert(darkHoursAlert + addedHours);
  }, [darkMinutesAlert, darkHoursAlert]);

  useEffect(() => {
    if (seconds < 60) return;

    // use modulo to calculate minutes and seconds
    const newSeconds = seconds % 60;
    const addedMinutes = (seconds - newSeconds) / 60;

    // set minutes and seconds
    setSeconds(newSeconds);
    setMinutes(minutes + addedMinutes);
  }, [seconds, minutes]);

  useEffect(() => {
    if (darkSecondsAlert < 60) return;

    // use modulo to calculate minutes and seconds
    const newSeconds = darkSecondsAlert % 60;
    const addedSeconds = (darkSecondsAlert - newSeconds) / 60;

    // set minutes and seconds
    setDarkSecondsAlert(newSeconds);
    setDarkMinutesAlert(darkMinutesAlert + addedSeconds);
  }, [darkSecondsAlert, darkMinutesAlert]);

  const handleUpdate = () => {
    const secondsPerRound = hours * 3600 + minutes * 60 + seconds;
    fetchPost(INITSTATS_ROUTE, { secondsPerRound });
  };

  const handleDarkUpdate = () => {
    const darkHourAlertBefore =
      darkHoursAlert * 3600 + darkMinutesAlert * 60 + darkSecondsAlert;
    fetchPost(INITSTATS_DARK_ALERT_ROUTE, { darkHourAlertBefore });
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

      {/*  */}
      <Row>
        <Title level={4}>Alert for Dark Hour before... (h:m:s)</Title>
      </Row>
      <Row>
        {/* hours */}
        <InputTime
          value={darkHoursAlert}
          onChange={(value) => setDarkHoursAlert(Number(value))}
        />
        :&nbsp;
        {/* minutes */}
        <InputTime
          value={darkMinutesAlert}
          onChange={(value) => setDarkMinutesAlert(Number(value))}
        />
        :&nbsp;
        {/* seconds */}
        <InputTime
          value={darkSecondsAlert}
          onChange={(value) => setDarkSecondsAlert(Number(value))}
        />
      </Row>
      <Row>
        <UpdateStat handleUpdate={handleDarkUpdate} />
      </Row>
    </>
  );
};

export default RoundStats;
