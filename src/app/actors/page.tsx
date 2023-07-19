import ResetButton from "./ResetButton"
import CorporationStats from "./corporation/CorporationStats"

const ActorsPage = async () => {

  return (<>
    <div>
      In here the actors can interact with the database
    </div>

    <ResetButton></ResetButton>

    <CorporationStats></CorporationStats>
  </>)
}

export default ActorsPage