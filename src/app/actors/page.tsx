import ResetButton from "./ResetButton"
import RoundManager from "./round/RoundManager"
import CorporationStats from "./corporation/CorporationStats"
import MapManager from "./map/MapManager"

/**
 * menu for actors to update database
 */
const ActorsPage = async () => {

  return (<>

    <ResetButton></ResetButton>

    <RoundManager></RoundManager>

    <CorporationStats></CorporationStats>

    <MapManager></MapManager>
  </>)
}

export default ActorsPage