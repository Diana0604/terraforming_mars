"use client"
import { PAUSE_GAME, PLAY_GAME, ROUND_MANAGER_ROUTE } from "@/constants"
import { Round } from "@/types"
import { Button, Card } from "antd"
import { useEffect, useState } from "react"

const TurnManager = () => {

  const [round, setRound] = useState<Round>()

  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false)
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeDisplay, setTimeDisplay] = useState<number>(0)
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timer>()

  useEffect(() => {

    //get round and set state
    fetch(ROUND_MANAGER_ROUTE, { method: "get" }).then(async (response: Response) => {
      const data = await response.json();
      setPlaying(data.playing)
      if (data.error) return //TO DO: set display message
      setRound(data)
      setTimeDisplay(data.timeLeftInSeconds)
    })

  }, [])

  //check round time
  useEffect(() => {
    if (!round) return;

    if (!round.playing) return clearInterval(timeInterval)

    const timeInt = setInterval(() => {
      setTimeDisplay((prevTime) => {
        if (prevTime < 1) {
          onClickPause()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
    setTimeInterval(timeInt)

    return () => clearInterval(timeInt)
  }, [round])


  const onClickPlay = async () => {
    setButtonsDisabled(true)
    const res = await fetch(ROUND_MANAGER_ROUTE, { method: "post", body: JSON.stringify({ ask: PLAY_GAME }) })
    const data = await res.json();
    if (data.error) return; //TODO: set display message
    setRound(data)
    setTimeDisplay(data.timeLeftInSeconds)
    setPlaying(true)
    setButtonsDisabled(false)
  }


  const onClickPause = async () => {
    const res = await fetch(ROUND_MANAGER_ROUTE, { method: "post", body: JSON.stringify({ ask: PAUSE_GAME }) })
    const data = await res.json();
    if (data.error) return; //TODO: set display message
    setRound(data)
    setTimeDisplay(data.timeLeftInSeconds)
    setPlaying(false)
    setButtonsDisabled(false)
  }


  return (
    <Card>
      <div>Turn Manager</div>

      {round && (
        <div>
          <div>CurrentRound: {round.number} </div>
          <div> Time Left In Seconds: {timeDisplay} </div>
          <div>Status: {round.playing ? "Playing" : "Paused"}</div>
          <div>Dark Hour: {round.darkHour ? "Active" : "Inactive"}</div>
        </div>
      )}
      <Button disabled={buttonsDisabled || playing} onClick={onClickPlay}>Play</Button>
      <Button disabled={buttonsDisabled || !playing} onClick={onClickPause}>Pause</Button>
    </Card>
  )

}

export default TurnManager