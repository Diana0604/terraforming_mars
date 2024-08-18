"use client";
import BuildingsInTile from "./build/BuildingsInTile";
import { IndividualCorporationContext } from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";
import { TilesContext } from "@/contexts/TileContext";
import { Card } from "antd";
import Build from "./build/Build";
//types
import { useContext } from "react";
import styles from "../controlpanel.module.css";

/**
 * Display stats of all buildings owned by a specific corporation
 */
const BuildingStats = () => {
  const corporation = useContext(IndividualCorporationContext);
  const { tiles } = useContext(TilesContext);

  //setup the display for each corporation

  return (
    <Card className={styles.panel}>
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
