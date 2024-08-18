"use client";

import { TILE_ROUTE } from "@/constants";
import { MessageContext } from "@/contexts/MessageContext";
import { TilesContext } from "@/contexts/TileContext";
import { fetchDelete, fetchPut } from "@/functions/database/database.fetchers";
import { Button, Select } from "antd";
import { useContext, useEffect, useState } from "react";

const TileDestroyer = () => {
  const { success, error } = useContext(MessageContext);
  const { tiles } = useContext(TilesContext);

  const [tileToDestroy, setTileToDestroy] = useState<string>();
  const [tileToRecover, setTileToRecover] = useState<string>();

  const [tileSelectOptions, setTileSelectOptions] =
    useState<{ value: string; label: string }[]>();
  const [destroyedTiles, setDestroyedTiles] =
    useState<{ value: string; label: string }[]>();

  useEffect(() => {
    const newSelectOptions = [];
    const newDestroyedTiles = [];
    for (const tile of tiles) {
      if (!tile.destroyed) {
        newSelectOptions.push({
          value: tile._id?.toString() || "",
          label: `${tile.column}${tile.row}`,
        });
      } else {
        newDestroyedTiles.push({
          value: tile._id?.toString() || "",
          label: `${tile.column}${tile.row}`,
        });
      }
    }
    setTileSelectOptions(newSelectOptions);
    setDestroyedTiles(newDestroyedTiles);
  }, [tiles]);

  const destroyCallback = async (res: any) => {
    const data = await res.json();
    setTileToDestroy(undefined);
    if (data.error) return error(data.error);
    success("Tile Destroyed");
  };

  const onDestroyTile = () => {
    // set body to destroy tile
    const body = {
      id: tileToDestroy,
      destroyed: true,
    };

    // put reqeust
    fetchDelete(TILE_ROUTE, body, destroyCallback);
  };

  const recoverCallback = async (res: any) => {
    const data = await res.json();
    setTileToRecover(undefined);
    if (data.error) return error(data.error);
    success("Tile Recovered");
  };

  const onRecoverTile = () => {
    // set body to undestroy tile
    const body = {
      id: tileToRecover,
      destroyed: false,
    };

    // put request
    fetchPut(TILE_ROUTE, body, recoverCallback);
  };

  return (
    <>
      <div>
        Destroy Tile:
        <Select
          value={tileToDestroy}
          showSearch
          onChange={setTileToDestroy}
          style={{ width: "200px" }}
          options={tileSelectOptions}
        ></Select>
        <Button disabled={!tileToDestroy} onClick={onDestroyTile}>
          Destroy
        </Button>
      </div>
      <div>
        Recover Tile:
        <Select
          value={tileToRecover}
          showSearch
          onChange={setTileToRecover}
          style={{ width: "200px" }}
          options={destroyedTiles}
        ></Select>
        <Button disabled={!tileToRecover} onClick={onRecoverTile}>
          Recover
        </Button>
      </div>
    </>
  );
};

export default TileDestroyer;
