"use client"
import { useContext, useEffect, useState } from 'react'
import styles from '../page.module.css'
import { Round } from '@/types';
import { RoundContext } from '@/contexts/RoundContext';
import { SECONDS_PER_ROUND } from '@/constants';

const Timer = () => {

    const [clock, setClock] = useState<NodeJS.Timer>();
    const [hydrated, setHydrated] = useState(false);
    //time in milliseconds
    const gameClockInterval = 1000 * SECONDS_PER_ROUND/ (1440/5) ;
    const [displayTime, setDisplayTime] = useState<Date>(new Date(Date.now()))
    const [round, setRound] = useState<Round>();
    const roundContext = useContext(RoundContext);

    const resetClock = () => {

        setDisplayTime(time => {
          if (roundContext.round.startTime) {
          let newTime = new Date()
          newTime.setHours(0,0,0,0)
          let startTime:Date = roundContext.round.startTime
          let elapsedTime = (Date.now() - startTime.getTime())
          let elapsedGameTime = elapsedTime*(86400/SECONDS_PER_ROUND)
          time.setTime(newTime.getTime() + elapsedGameTime);
          }
          return time
        })

      
    }
    // const startClock = () => {
    //   const gameClock = setInterval(() => {
    //     //advance clock 5 minutes
    //     setDisplayTime((time) => {
    //       let newTime = new Date();
    //       newTime.setTime(time.getTime() + 5 * 60 * 1000);
    //       return newTime;
    //     })
 

    //     if(displayTime.getHours() == 23 && displayTime.getMinutes() == 55) {
    //       console.log("end of turn")
    //       clearInterval(gameClock);
    //     }
    //   }, gameClockInterval)
    //   // setClock(gameClock);
    //   return () => clearInterval(gameClock)
    // }
    useEffect(() => {
      setHydrated(true);
      //initial display of time
      resetClock()
    }, [roundContext.round])

    useEffect(() => {
      setRound(roundContext.round)
    }, [roundContext.round])

    if (!hydrated) {
      // Returns null on first render, so the client and server match
      return null;
    }






    return (
      <div>
        <div className={styles.timer} >
          { round?.darkHour ? "Dark Hour" : displayTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'}) }
        </div>
      </div>
    )
}

export default Timer;