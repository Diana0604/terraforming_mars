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

    useEffect(() => {
      setHydrated(true);
      //initial display of time
      resetClock()

      const initRound:Promise<Round> = fetch("/api/round").then(res => res.json())
      initRound.then(data => setRound(data))


    }, [])

    if (!hydrated) {
      // Returns null on first render, so the client and server match
      return null;
    }

    const startClock = () => {
      const gameClock = setInterval(() => {
        displayTime.setTime(displayTime.getTime() + 5 * 60 * 1000)
        setDisplayTime(displayTime)
        console.log(displayTime.getTime())

        if(displayTime.getHours() == 0 && displayTime.getMinutes() == 0) {
          console.log("end of turn")
          clearInterval(gameClock);
        }
      }, gameClockInterval)
      setClock(gameClock);
      return () => clearInterval(gameClock)
    }





    return (
      <div>
        <div className={styles.timer} onClick={startClock}>
          { round?.darkHour ? "Dark Hour" : displayTime.toLocaleTimeString() }
        </div>
      </div>
    )
}

export default Timer;