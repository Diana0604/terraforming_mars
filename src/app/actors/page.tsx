import ResetButton from "./ResetButton"
import TurnManager from "./turns/TurnManager"
import CorporationStats from "./corporation/CorporationStats"

/**
 * menu for actors to update database
 */
const ActorsPage = async () => {

  return (<>

    <ResetButton></ResetButton>

    <TurnManager></TurnManager>

    <CorporationStats></CorporationStats>
  </>)
}

export default ActorsPage