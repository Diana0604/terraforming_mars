import { Row } from "antd";
import IndividualTile from "./IndividualTile";
import { TilesContext } from "@/contexts/TileContext";
import { useContext } from "react";
import {
  IndividualTileContextProvider,
} from "./IndividualTileContext";

const TileStats = () => {
  const { tiles } = useContext(TilesContext);

  return (
    <Row>
      {tiles.map((tile, index) => (
        <IndividualTileContextProvider key={index} tile={tile}>
          <IndividualTile />
        </IndividualTileContextProvider>
      ))}
    </Row>
  );
};

export default TileStats;
