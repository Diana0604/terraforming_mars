"use client";
//types
import { useContext } from "react";

//contexts
import { IndividualCorporationContext } from "../IndividualCorporationContext";

//components
import Build from "./Build";
import { Card } from "antd";
import { TilesContext } from "@/contexts/TileContext";
import BuildingsInTile from "./BuildingsInTile";

/**
 * Display stats of all buildings owned by a specific corporation
 */
const BuildingStats = () => {
  const corporation = useContext(IndividualCorporationContext);
  const { tiles } = useContext(TilesContext);

  //setup the display for each corporation

  return (
    <Card style={{ width: "50%", height: "100%" }}>
      {/* build new */}
      <Build />

      {/* currently owned */}
      <div>
        <div>Buildings currently owned by this corporation:</div>
        {tiles.map((tile, index) => (
          <BuildingsInTile tile={tile} corporation={corporation} key={index} />
        ))}
      </div>
    </Card>
  );
};

export default BuildingStats;
