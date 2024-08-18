"use client";
//database routes
import { BUILD_DATABASE_ROUTE, INIT_BUILDINGS_ROUTE } from "@/constants";

//react
import { useContext, useEffect, useState } from "react";

//ant design
import { Card, Select, Button } from "antd";
import { TilesContext } from "@/contexts/TileContext";
import { BuildingConstant } from "@/types";
import { fetchGet, fetchPost } from "@/functions/database/database.fetchers";
import { MessageContext } from "@/contexts/MessageContext";
import { IndividualCorporationContext } from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";
import styles from "../../controlpanel.module.css";
import InitialResourcesContextProvider from "@/app/initialstats/resources/InitialResourcesContext";
import CustomBuilding from "./CustomBuilding";

/**
 * Interactive building menu
 */
const Build = () => {
  const { success, error } = useContext(MessageContext);

  // get corporation form context
  const corporation = useContext(IndividualCorporationContext);

  // get tiles from context
  const { tiles } = useContext(TilesContext);

  const [buildingList, setBuildingList] = useState<BuildingConstant[]>([]);

  // indicates if we are currently building a custom building, which will open the custom buildings panel
  const [buildingCustom, setBuildingCustiom] = useState<Boolean>(false);

  //save buildingType and tile desired to build
  const [buildingType, setBuildingType] = useState<string>();
  const [tile, setTile] = useState<String>();

  const getBuildingsCallback = (data: BuildingConstant[]) =>
    setBuildingList(data);

  useEffect(() => {
    fetchGet(INIT_BUILDINGS_ROUTE, getBuildingsCallback);
  }, []);

  //create list for building type choosing select
  const buildingSelectOptions = buildingList.map((value) => {
    return {
      value: value.buildingType,
      label: value.buildingType,
    };
  });

  //create list for tile choosing select
  const filteredTiles = tiles
    .filter(
      (tile) =>
        !tile.destroyed &&
        (!tile.colonizedBy || tile.colonizedBy._id === corporation._id)
    )
    .map((tile) => {
      return {
        value: `${tile.column}${tile.row}`,
        label: `${tile.column}${tile.row}`,
      };
    });

  // callback for receiving building post response
  const postBuildingCallback = async (response: any) => {
    const data = await response.json();
    if (data.error) return error(data.error);
    return success("Database udpated");
  };

  //onclickbuild event handler
  const onClickBuild = () => {
    // check building type is defined
    if (buildingType === undefined) return;

    // create body
    const body = { buildingType, corporation: corporation.name, tile };

    // update database
    fetchPost(BUILD_DATABASE_ROUTE, body, postBuildingCallback);
  };

  return (
    <Card className={styles.basic}>
      <h3>Add Building to Tile</h3>
      <div style={{ marginBottom: "10px" }}>
        <span style={{ width: "200px" }}>building: </span>{" "}
        <Select
          showSearch
          onChange={setBuildingType}
          style={{ width: "200px" }}
          options={buildingSelectOptions}
        ></Select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <span style={{ width: "200px" }}>tile: </span>{" "}
        <Select
          showSearch
          onChange={setTile}
          style={{ width: "200px" }}
          options={filteredTiles}
        ></Select>
      </div>

      <Button className={styles.basic} onClick={onClickBuild}>
        Build
      </Button>

      {/* custom building stuff */}
      <Button
        style={{ marginLeft: "5px" }}
        className={styles.basic}
        onClick={() => setBuildingCustiom(!buildingCustom)}
      >
        Add Custom Building
      </Button>

      {buildingCustom ? (
        <InitialResourcesContextProvider>
          <CustomBuilding onBuild={() => setBuildingCustiom(!buildingCustom)} />
        </InitialResourcesContextProvider>
      ) : undefined}
    </Card>
  );
};

export default Build;
