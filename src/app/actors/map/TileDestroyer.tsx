"use client"

import { TILE_ROUTE } from "@/constants"
import { TilesContext } from "@/contexts/TileContext"
import { Button, Select } from "antd"
import { useContext, useEffect, useState } from "react"

const TileDestroyer = () => {

  const { tiles } = useContext(TilesContext)

  const [tileToDestroy, setTileToDestroy] = useState<string>()
  const [tileToRecover, setTileToRecover] = useState<string>()

  const [tileSelectOptions, setTileSelectOptions] = useState<{ value: string, label: string }[]>()
  const [destroyedTiles, setDestroyedTiles] = useState<{ value: string, label: string }[]>()

  useEffect(() => {
    const newSelectOptions = []
    const newDestroyedTiles = []
    for (const tile of tiles) {
      if (!tile.destroyed) {
        newSelectOptions.push({ value: tile._id?.toString() || '', label: `${tile.column}${tile.row}` })
      } else {
        newDestroyedTiles.push({ value: tile._id?.toString() || '', label: `${tile.column}${tile.row}` })
      }
    }
    setTileSelectOptions(newSelectOptions)
    setDestroyedTiles(newDestroyedTiles)
  }, [tiles])

  const onDestroyTile = async () => {
    try {
      await fetch(`${TILE_ROUTE}`, { method: 'delete', body: JSON.stringify({ id: tileToDestroy }) })
      setTileToDestroy(undefined)
    } catch (error) {
      console.log(error)
    }
  }

  const onRecoverTile = async () => {
    try {
      await fetch(`${TILE_ROUTE}`, { method: 'post', body: JSON.stringify({ id: tileToRecover }) })
      setTileToRecover(undefined)
    } catch (error) {
      console.log(error)
    }
  }


  return (<>
    <div>
      Destroy Tile:
      <Select value={tileToDestroy} showSearch onChange={setTileToDestroy} style={{ width: "200px" }} options={tileSelectOptions}></Select>
      <Button  disabled={!tileToDestroy} onClick={onDestroyTile}>Destroy</Button>
    </div>
    <div>

      Recover Tile:
      <Select value={tileToRecover} showSearch onChange={setTileToRecover} style={{ width: "200px" }} options={destroyedTiles}></Select>
      <Button disabled={!tileToRecover} onClick={onRecoverTile}>Recover</Button>
    </div>
  </>)
}

export default TileDestroyer