"use client"
import { PAUSE_GAME, PLAY_GAME, ROUND_MANAGER_ROUTE } from "@/constants"
import { Round } from "@/types"
import { Button, Card } from "antd"
import { useEffect, useState } from "react"

const TurnManager = () => {

  const [round, setRound] = useState<Round>()

  useEffect(() => {

    //get round and set state
    fetch(ROUND_MANAGER_ROUTE, { method: "get" }).then(async (response: Response) => {
      const newRound = await response.json();
      setRound(newRound)
    })

  }, [])

  const onClickPlay = () => {
    fetch(ROUND_MANAGER_ROUTE, { method: "post", body: JSON.stringify({ ask: PLAY_GAME }) })
  }


  const onClickPause = () => {
    fetch(ROUND_MANAGER_ROUTE, { method: "post", body: JSON.stringify({ ask: PAUSE_GAME }) })
  }


  return (
    <Card>
      <div>Turn Manager</div>

      {round && (
        <div>
          <div>CurrentRound: {round.number} </div>
          <div> Time Left In Seconds: {round.timeLeftInSeconds} </div>
        </div>
      )}
      <Button onClick={onClickPlay}>Play</Button>
      <Button onClick={onClickPause}>Pause</Button>
    </Card>
  )

}

export default TurnManager