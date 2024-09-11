import { RoundContext } from "@/contexts/RoundContext";
import { Button } from "antd";
import { useContext } from "react";
import styles from "../controlpanel.module.css";
import { IndividualCorporationContext } from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";
import { fetchPost } from "@/functions/database/database.fetchers";
import { READY_FOR_NEXT_ROUND_ROUTE } from "@/constants";
import { MessageContext } from "@/contexts/MessageContext";

const ReadyForNextRound = () => {
  const { round } = useContext(RoundContext);
  const corporation = useContext(IndividualCorporationContext);
  const { success, error } = useContext(MessageContext);

  // callback for receiving building post response
  const postReadyCallback = async (response: any) => {
    const data = await response.json();
    if (data.error) return error(data.error);
    return success("Database udpated");
  };

  const setReady = () =>
    fetchPost(
      READY_FOR_NEXT_ROUND_ROUTE,
      { corporation: corporation.name },
      postReadyCallback
    );

  return (
    <Button
      onClick={setReady}
      className={styles.next_day_button}
      disabled={!round.darkHour || corporation.readyForNextRound}
    >
      Ready For Next Day
    </Button>
  );
};

export default ReadyForNextRound;
