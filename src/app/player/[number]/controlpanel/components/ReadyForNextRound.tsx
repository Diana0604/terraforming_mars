import { RoundContext } from "@/contexts/RoundContext";
import { Button } from "antd";
import { useContext } from "react";
import styles from "../controlpanel.module.css";

const ReadyForNextRound = () => {
  const { round } = useContext(RoundContext);

  return (
    <Button className={styles.next_day_button} disabled={!round.darkHour}>
      Ready For Next Day
    </Button>
  );
};

export default ReadyForNextRound;
