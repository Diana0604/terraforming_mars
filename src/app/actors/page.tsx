import ResetButton from "./ResetButton";
import RoundManager from "./round/RoundManager";
import CorporationStats from "./corporation/CorporationStats";
import MapManager from "./map/MapManager";
import CustomBuilding from "./corporation/CustomBuilding";
import AlertManager from "./AlertManager";
import MessageContextProvider from "@/contexts/MessageContext";
import InitialResourcesContextProvider from "../initialstats/resources/InitialResourcesContext";
import InitialBuildingContextProvider from "../initialstats/buildings/InitialBuildingContext";

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

      <InitialResourcesContextProvider>
        <InitialBuildingContextProvider>
          <CustomBuilding />
        </InitialBuildingContextProvider>
      </InitialResourcesContextProvider>

      <AlertManager />
    </>
  );
};

export default ActorsPage;
