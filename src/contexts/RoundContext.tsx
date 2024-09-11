import { ROUND_MANAGER_ROUTE } from "@/constants";
import { fetchGet } from "@/functions/database/database.fetchers";
import { Round } from "@/types";
import React, { useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";

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
  //corporation objects and setters
  const [round, setRound] = useState<Round>(initialRoundProps.round);

  const updateRoundCallback = (data: Round) => {
    if (data && data.startTime) data.startTime = new Date(data.startTime);
    setRound(data);
  };

  const updateRound = () => fetchGet(ROUND_MANAGER_ROUTE, updateRoundCallback);

  useInterval(updateRound, 1000);

  //return provider values
  return (
    <RoundContext.Provider value={{ round }}>{children}</RoundContext.Provider>
  );
};
