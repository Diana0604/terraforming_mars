import {
  INITSTATS_DARK_ALERT_ROUTE,
  INITSTATS_ROUTE,
  ROUND_MANAGER_ROUTE,
} from "@/constants";
import { fetchGet } from "@/functions/database/database.fetchers";
import { Round } from "@/types";
import React, { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import useSound from "use-sound";

//tiles can be accessed from context
type contextProps = {
  round: Round;
};

//initial corporation values
const initialRoundProps: contextProps = {
  round: {
    number: 0,
    playing: false,
    darkHour: false,
  },
};

//build context
export const RoundContext: React.Context<contextProps> =
  React.createContext(initialRoundProps);

//build context provider
export const RoundContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sound = `${window.location.origin}/sounds/darkHour.mp3`;
  //corporation objects and setters
  const [round, setRound] = useState<Round>(initialRoundProps.round);
  const [alertDarkHour] = useSound(sound);
  const [secondsPerRound, setSecondsPerRound] = useState<number>(0);
  const [darkHourAlertBefore, setDarkHourAlertBefore] = useState<number>(0);

  const updateRoundCallback = (data: Round) => {
    if (data && data.startTime) data.startTime = new Date(data.startTime);
    setRound(data);
  };

  const updateRound = () => fetchGet(ROUND_MANAGER_ROUTE, updateRoundCallback);

  useInterval(updateRound, 1000);

  const needPlayDarkHour = () => {
    if (!round.startTime) return;
    if (round.darkHour) return;

    const startTime: Date = round.startTime;
    const elapsedSeconds = (Date.now() - startTime.getTime()) / 1000;

    if (secondsPerRound - elapsedSeconds < darkHourAlertBefore) alertDarkHour();
  };

  useInterval(needPlayDarkHour, 2000);

  const getInitStatsCallback = (data: any) =>{
    setSecondsPerRound(data.secondsPerRound);
    setDarkHourAlertBefore(data.darkHourAlertBefore);
  }

  useEffect(() => {
    fetchGet(INITSTATS_ROUTE, getInitStatsCallback);
  }, []);

  //return provider values
  return (
    <RoundContext.Provider value={{ round }}>{children}</RoundContext.Provider>
  );
};
