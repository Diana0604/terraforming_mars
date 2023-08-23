
import { ROUND_MANAGER_ROUTE } from "@/constants";
import { Round } from "@/types";
import React, { useState, useEffect } from "react";
import { SECONDS_PER_ROUND } from "@/constants";

//tiles can be accessed from context
type contextProps = {
  round: Round
}

//initial corporation values
const initialRoundProps: contextProps = {
  round: {
    number: 0,
    playing: false,
    darkHour: false
  }
};

//build context
export const RoundContext: React.Context<contextProps> = React.createContext(initialRoundProps);

//build context provider
export const RoundContextProvider = ({ children }: { children: React.ReactNode }) => {

  //corporation objects and setters
  const [round, setRound] = useState<Round>(initialRoundProps.round)


  useEffect(() => {

    //update round info every second by fetching from database
    const updateRound = () => {
      try {
        fetch(ROUND_MANAGER_ROUTE, { method: 'get' }).then(async response => {
          const data = await response.json();
          if(data.startTime)
            data.startTime = new Date(data.startTime)
          setRound(data)
        }, (error) => { console.log('error on fetch', error) })
      } catch (error) {
        console.log('error on fetch', error)
      }
    }

    updateRound()

    // const gameInterval = Math.floor(1000*SECONDS_PER_ROUND*5/1440)
    // console.log(gameInterval)
    const interval = setInterval(updateRound, 1000)

    //destroy interval at dismount
    return () => {
      clearInterval(interval)
    }
  }, [])

  //return provider values
  return (
    <RoundContext.Provider value={{ round }}>
      {children}
    </RoundContext.Provider>
  );
};

