import { RoundContext } from "@/contexts/RoundContext";
import { Button } from "antd";
import { useContext, useEffect } from "react";
import styles from "../controlpanel.module.css";
import { IndividualCorporationContext } from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";

const ReadyForNextRound = () => {
  const { round } = useContext(RoundContext);
  const corporation = useContext(IndividualCorporationContext);

  return (
    <Button
      className={styles.next_day_button}
      disabled={!round.darkHour || corporation.readyForNextRound}
    >
      Ready For Next Day
    </Button>
  );
};

export default ReadyForNextRound;
