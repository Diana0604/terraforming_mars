import ResetButton from "./ResetButton"
import RoundManager from "./round/RoundManager"
import CorporationStats from "./corporation/CorporationStats"
import MapManager from "./map/MapManager"
import CustomBuilding from "./corporation/CustomBuilding"
import AlertManager from "./AlertManager"

/**
 * menu for actors to update database
 */
const ActorsPage = async () => {

  return (<>

    <ResetButton></ResetButton>

    <RoundManager></RoundManager>

    <CorporationStats></CorporationStats>

    <MapManager></MapManager>
    <CustomBuilding/>
    <AlertManager/>
  </>)
}

export default ActorsPage