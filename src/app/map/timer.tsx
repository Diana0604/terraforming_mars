"use client"
import { useEffect, useState } from 'react'
import styles from '../page.module.css'
import { Round } from '@/types';

const Timer = () => {

    const [clock, setClock] = useState<NodeJS.Timer>();
    const [hydrated, setHydrated] = useState(false);
    //time in milliseconds
    const gameClockInterval = 2080;
    const [displayTime, setDisplayTime] = useState<Date>(new Date(Date.now()))
    const [round, setRound] = useState<Round>();

    const resetClock = () => {
      displayTime.setHours(0,0,0,0)
      // console.log(displayTime.getHours())
      setDisplayTime(displayTime);
    }


    const startClock = () => {
      const gameClock = setInterval(() => {
        //advance clock 5 minutes
        setDisplayTime((time) => {
          let newTime = new Date();
          newTime.setTime(time.getTime() + 5 * 60 * 1000);
          return newTime;
        })
 

        if(displayTime.getHours() == 23 && displayTime.getMinutes() == 55) {
          console.log("end of turn")
          clearInterval(gameClock);
        }
      }, gameClockInterval)
      // setClock(gameClock);
      return () => clearInterval(gameClock)
    }

    useEffect(() => {
      setHydrated(true);
      //initial display of time
      resetClock()
      startClock()

      const initRound:Promise<Round> = fetch("/api/round").then(res => res.json())
      initRound.then(data => setRound(data))


    }, [])

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