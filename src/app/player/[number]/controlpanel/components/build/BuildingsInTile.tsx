import { Corporation, Tile } from "@/types";
import { Row } from "antd";
import styles from '../../controlpanel.module.css'

interface BuildingsInTileProps {
  corporation: Corporation;
  tile: Tile;
}

const BuildingsInTile = (props: BuildingsInTileProps) => {
  const { corporation, tile } = props;

  // get buildings in that tile
  const buildingsInTile = corporation.buildingsOwned.filter(
    (building) => building.tile._id === tile._id
  );
  // get buildings next round
  let buildingsNextRound;
  if (corporation.newBuildingsNextRound)
    buildingsNextRound = corporation.newBuildingsNextRound.filter(
      (building) => building.tile._id === tile._id
    );
  const displayNextRound = buildingsNextRound && buildingsNextRound.length > 0;

  // do not display tile if no buildings present
  if (buildingsInTile.length === 0 && !displayNextRound) return undefined;
  return (
    <div>
      <>
        {/* display title */}
        <div style={{ fontWeight: "bold" }}>
          Tile {tile.column}
          {tile.row}: &nbsp;
        </div>

        {/* display owned buildings */}
        <Row className={styles.font}>
          {buildingsInTile.map((value, index) => (
            <span key={index}>{value.buildingType},&nbsp;</span>
          ))}
        </Row>

        {/* display buildings next round */}
        {buildingsNextRound && displayNextRound ? (
          <Row className={styles.font}>
            <span>Buildings next round:{" "}</span>
            {buildingsNextRound.map((value, index) => (
              <span key={index}>{value.buildingType},&nbsp;</span>
            ))}
          </Row>
        ) : undefined}
      </>
    </div>
  );
};

export default BuildingsInTile;
