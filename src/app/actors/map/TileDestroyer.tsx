"use client"

import { TILE_ROUTE } from "@/constants"
import { TilesContext } from "@/contexts/TileContext"
import { Button, Select } from "antd"
import { useContext, useEffect, useState } from "react"

const TileDestroyer = () => {

  const { tiles } = useContext(TilesContext)

  const [tile, setTile] = useState<string>()

  const [tileSelectOptions, setTileSelectOptions] = useState<{ value: string, label: string }[]>()

  useEffect(() => {
    const newSelectOptions = []
    for (const tile of tiles) {
      if (!tile.destroyed) {
        newSelectOptions.push({ value: tile._id?.toString() || '', label: `${tile.column}${tile.row}` })
      }
    }
    setTileSelectOptions(newSelectOptions)
  }, [tiles])

  const onDestroyTile = async () => {
    try {
      //const res = await fetch(`${TILE_ROUTE}`)
      const res = await fetch(`${TILE_ROUTE}`, { method: 'delete', body: JSON.stringify({ id: tile }) })
    } catch (error) {
      console.log(error)
    }
  }


  return (<div>
    Destroy Tile:
    <div>NOTE TO DANNY: Tiles can be destroyed and this is reflected on the database (corps cannot build anymore) but not on the map</div>
    <Select showSearch onChange={setTile} style={{ width: "200px" }} options={tileSelectOptions}></Select>
    <Button disabled={!tile} onClick={onDestroyTile}>Destroy</Button>
  </div>)
}

export default TileDestroyer