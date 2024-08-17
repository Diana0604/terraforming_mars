import { Col, Card } from "antd";
import HazardsList from "./components/HazardsList";
import UpdateStat from "../components/UpdateStat";
import LandmarkInput from "./components/LandmarkInput";
import ResourcesList from "./components/ResourcesList";
import { useContext } from "react";
import { IndividualTileContext } from "./IndividualTileContext";

const IndividualTile = () => {
  const {tile, saveTile} = useContext(IndividualTileContext);

  return (
    <Col className="mr-10 mb-10">
      <Card size={"default"} title={`${tile.column}${tile.row}`}>
        {/* resources */}
        <ResourcesList/>

        {/* landmark */}
        <LandmarkInput />

        {/* list of present hazards which can be deleted */}
        <HazardsList />

        {/* update tile */}
        <UpdateStat handleUpdate={saveTile} />
      </Card>
    </Col>
  );
};

export default IndividualTile;
