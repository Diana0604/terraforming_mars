"use client"
import { PAUSE_GAME, PLAY_GAME, ROUND_MANAGER_ROUTE, SKIP_TO_DARK } from "@/constants"
import { RoundContext } from "@/contexts/RoundContext"
import { Button, Card } from "antd"
import { useContext, useState } from "react"

const TurnManager = () => {

  const { round } = useContext(RoundContext)

  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false)

  const onClickPlay = async () => {
    setButtonsDisabled(true)
    const res = await fetch(ROUND_MANAGER_ROUTE, { method: "post", body: JSON.stringify({ ask: PLAY_GAME }) })
    const data = await res.json();
    if (data.error) return; //TODO: set display message
    if (data.startTime) data.startTime = new Date(data.startTime)
    setButtonsDisabled(false)
  }


  const onClickPause = async () => {
    setButtonsDisabled(true)
    const res = await fetch(ROUND_MANAGER_ROUTE, { method: "post", body: JSON.stringify({ ask: PAUSE_GAME }) })
    const data = await res.json();
    if (data.error) return; //TODO: set display message
    if (data.startTime) data.startTime = new Date(data.startTime)
    setButtonsDisabled(false)
  }

  const onClickSkip = async () => {
    setButtonsDisabled(true)
    await fetch(SKIP_TO_DARK, { method: "post" })
    setButtonsDisabled(false)
  }

  return (
    <Card>
      <div>Turn Manager</div>

      {round && (
        <div>

          <div>CurrentRound: {round.number} </div>
          <div>Status: {round.playing ? "Playing" : "Paused"}</div>
          <div>Dark Hour: {round.darkHour ? "Active" : "Inactive"}</div>
          {
            (round.startTime) && <div>Round Started At: {`${round.startTime.getHours()}:${round.startTime.getMinutes()}:${round.startTime.getSeconds()}`} </div>
          }
        </div>
      )}
      <Button disabled={buttonsDisabled || !round || (round.playing)} onClick={onClickPlay}>Play</Button>
      <Button disabled={buttonsDisabled || !round || !(round.playing)} onClick={onClickPause}>Pause</Button>
      <Button disabled={buttonsDisabled || !round || (round.darkHour)} onClick={onClickSkip}>Skip to Dark Hour</Button>
    </Card>
  )

}

export default TurnManager