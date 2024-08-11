import { initTiles } from "@/constants";
import { Row } from "antd";
import IndividualTile from "./IndividualTile";

const TileStats = () => {

  return (
    <Row>
      {initTiles.map((value, index) => (
        <IndividualTile {...value} key={index}/>
      ))}
    </Row>
  );
};

export default TileStats;
