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
    <Card>
      {/* currently owned */}
      <div>
        <div>Buildings currently owned by this corporation:</div>
        {tiles.map((tile, index) => (
          <BuildingsInTile tile={tile} corporation={corporation} key={index} />
        ))}
      </div>

      {/* build new */}
      <Build />
    </Card>
  );
};

export default BuildingStats;
