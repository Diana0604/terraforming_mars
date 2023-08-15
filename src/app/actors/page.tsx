import ResetButton from "./ResetButton"
import RoundManager from "./round/RoundManager"
import CorporationStats from "./corporation/CorporationStats"
import CustomBuilding from "./corporation/CustomBuilding"

/**
 * menu for actors to update database
 */
const ActorsPage = async () => {

  return (<>

    <ResetButton></ResetButton>

    <RoundManager></RoundManager>

    <CorporationStats></CorporationStats>

    <CustomBuilding/>
  </>)
}

export default ActorsPage