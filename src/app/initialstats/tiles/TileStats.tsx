import { Row } from "antd";
import IndividualTile from "./IndividualTile";
import { TilesContext } from "@/contexts/TileContext";
import { useContext } from "react";
import { IndividualTileContextProvider } from "./IndividualTileContext";
import HasChangedContextProvider from "@/contexts/HasChangedContext";

const TileStats = () => {
  const { tiles } = useContext(TilesContext);

  return (
    <Row>
      {tiles.map((tile, index) => (
        <HasChangedContextProvider key={index}>
          <IndividualTileContextProvider tile={tile}>
            <IndividualTile />
          </IndividualTileContextProvider>
        </HasChangedContextProvider>
      ))}
    </Row>
  );
};

export default TileStats;
