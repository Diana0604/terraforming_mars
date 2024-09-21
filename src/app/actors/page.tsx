import ResetButton from "./ResetButton";
import RoundManager from "./round/RoundManager";
import CorporationStats from "./corporation/CorporationStats";
import MapManager from "./map/MapManager";
import AlertManager from "./AlertManager";
import MessageContextProvider from "@/contexts/MessageContext";

/**
 * menu for actors to update database
 */
const ActorsPage = async () => {
  return (
    <>
      <ResetButton></ResetButton>

      <RoundManager></RoundManager>

      <MessageContextProvider>
        <CorporationStats></CorporationStats>
      </MessageContextProvider>

      <MapManager></MapManager>

      <AlertManager />
    </>
  );
};

export default ActorsPage;
