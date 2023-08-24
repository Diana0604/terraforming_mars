"use client"
import { useContext, useEffect, useState } from 'react'
import styles from '../page.module.css'
import { Round } from '@/types';
import { RoundContext } from '@/contexts/RoundContext';
import { SECONDS_PER_ROUND } from '@/constants';

const Timer = () => {

    const [hydrated, setHydrated] = useState(false);
    //time in milliseconds
    const [displayTime, setDisplayTime] = useState<Date>(new Date(Date.now()))
    const [round, setRound] = useState<Round>();
    const roundContext = useContext(RoundContext);
    useEffect(() => {

        const resetClock = () => {

          setDisplayTime(time => {
            if (roundContext.round.startTime) {
            let newTime = new Date()
            newTime.setHours(0,0,0,0)
            let startTime:Date = roundContext.round.startTime
            let elapsedTime = (Date.now() - startTime.getTime())
            let elapsedGameTime = elapsedTime*(86400/SECONDS_PER_ROUND)
            time.setTime(newTime.getTime() + elapsedGameTime);

            //floor to nearest 5 minutes
            time.setMinutes(time.getMinutes() - time.getMinutes()%5)

            }
            return time
          })

        
      }

      setHydrated(true);
      //initial display of time
      if(roundContext.round.playing && !roundContext.round.darkHour) resetClock()
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