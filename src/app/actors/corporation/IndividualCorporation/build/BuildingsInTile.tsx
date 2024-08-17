import { Corporation, Tile } from "@/types";
import { Row } from "antd";
import BuildingCard from "./BuildingCard";

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
        <Row>
          {buildingsInTile.map((building, index) => (
            <BuildingCard {...building} key={index} />
          ))}
        </Row>

        {/* display buildings next round */}
        {buildingsNextRound && displayNextRound ? (
          <>
            Buildings next round:{" "}
            {buildingsNextRound.map((value, index) => (
              <span key={index}>{value.buildingType},&nbsp;</span>
            ))}
          </>
        ) : undefined}
      </>
    </div>
  );
};

export default BuildingsInTile;
