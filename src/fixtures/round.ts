import { SECONDS_PER_ROUND } from "@/constants";
import { Round } from "@/types";

const firstRound: Round = {
  number: 1,
  timeLeftInSeconds: SECONDS_PER_ROUND,
  playing: false,
  darkHour: false
};

export default firstRound;
