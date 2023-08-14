"use client"
import { PAUSE_GAME, PLAY_GAME, ROUND_MANAGER_ROUTE } from "@/constants"
import { Round } from "@/types"
import { Button, Card } from "antd"
import { useEffect, useState } from "react"

const TurnManager = () => {

  const [round, setRound] = useState<Round>()

  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false)
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timer>()

  useEffect(() => {

    //get round and set state
    fetch(ROUND_MANAGER_ROUTE, { method: "get" }).then(async (response: Response) => {
      const data = await response.json();
      if (data.error) return //TO DO: set display message
      if (data.startTime) data.startTime = new Date(data.startTime)
      setRound(data)
    })

  }, [])

  //check round time
  useEffect(() => {
    if (!round) return;

    if (!round.playing) return clearInterval(timeInterval)

    const timeInt = setInterval(async () => {
      const res = await fetch(ROUND_MANAGER_ROUTE, { method: "get" })
      const data = await res.json()
      if (!data.playing) {
        if (data.startTime) data.startTime = new Date(data.startTime)
        setRound(data)
      }
    }, 5000)
    setTimeInterval(timeInt)

    return () => clearInterval(timeInt)
  }, [round])


  const onClickPlay = async () => {
    setButtonsDisabled(true)
    const res = await fetch(ROUND_MANAGER_ROUTE, { method: "post", body: JSON.stringify({ ask: PLAY_GAME }) })
    const data = await res.json();
    if (data.error) return; //TODO: set display message
    if (data.startTime) data.startTime = new Date(data.startTime)
    setRound(data)
    setButtonsDisabled(false)
  }


  const onClickPause = async () => {
    setButtonsDisabled(true)
    const res = await fetch(ROUND_MANAGER_ROUTE, { method: "post", body: JSON.stringify({ ask: PAUSE_GAME }) })
    const data = await res.json();
    if (data.error) return; //TODO: set display message
    if (data.startTime) data.startTime = new Date(data.startTime)
    setRound(data)
    setButtonsDisabled(false)
  }

  return (
    <Card>
      <div>Turn Manager</div>

      {round && (
        <div>
          <div>CurrentRound: {round.number} </div>
          <div> Round Started At: {(round && round.startTime) ? `${round.startTime.getHours()}:${round.startTime.getMinutes()}:${round.startTime.getSeconds()}` : 'round not started'} </div>
          <div>Status: {round.playing ? "Playing" : "Paused"}</div>
          <div>Dark Hour: {round.darkHour ? "Active" : "Inactive"}</div>
        </div>
      )}
      <Button disabled={buttonsDisabled || !round || (round.playing)} onClick={onClickPlay}>Play</Button>
      <Button disabled={buttonsDisabled || !round || !(round.playing)} onClick={onClickPause}>Pause</Button>
    </Card>
  )

}

export default TurnManager