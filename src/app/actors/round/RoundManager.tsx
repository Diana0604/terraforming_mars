"use client";
import {
  PAUSE_GAME,
  PLAY_GAME,
  ROUND_MANAGER_ROUTE,
  SKIP_TO_DARK,
} from "@/constants";
import { RoundContext } from "@/contexts/RoundContext";
import { fetchPost } from "@/functions/database/database.fetchers";
import { Button, Card } from "antd";
import { useContext, useState } from "react";

const TurnManager = () => {
  // round information -> continuously updating
  const { round } = useContext(RoundContext);

  // while update is happening at db, all buttons will be disabled
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

  // ask database to play game
  const onClickPlay = () => {
    setButtonsDisabled(true);
    fetchPost(ROUND_MANAGER_ROUTE, { ask: PLAY_GAME });
    setButtonsDisabled(false);
  };

  // ask database to pause game
  const onClickPause = () => {
    setButtonsDisabled(true);
    fetchPost(ROUND_MANAGER_ROUTE, { ask: PAUSE_GAME });
    setButtonsDisabled(false);
  };

  // ask database to skip to dark hour
  const onClickSkip = () => {
    setButtonsDisabled(true);
    fetchPost(SKIP_TO_DARK, {});
    setButtonsDisabled(false);
  };

  return (
    <Card>
      <div>Turn Manager</div>

      {round && (
        <div>
          <div>CurrentRound: {round.number} </div>
          <div>Status: {round.playing ? "Playing" : "Paused"}</div>
          <div>Dark Hour: {round.darkHour ? "Active" : "Inactive"}</div>
          {round.startTime && (
            <div>
              Round Started At:{" "}
              {`${round.startTime.getHours()}:${round.startTime.getMinutes()}:${round.startTime.getSeconds()}`}{" "}
            </div>
          )}
        </div>
      )}
      <Button
        disabled={buttonsDisabled || !round || round.playing}
        onClick={onClickPlay}
      >
        Play
      </Button>
      <Button
        disabled={buttonsDisabled || !round || !round.playing}
        onClick={onClickPause}
      >
        Pause
      </Button>
      <Button
        disabled={buttonsDisabled || !round || round.darkHour}
        onClick={onClickSkip}
      >
        Skip to Dark Hour
      </Button>
    </Card>
  );
};

export default TurnManager;
