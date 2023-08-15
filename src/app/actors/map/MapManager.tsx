"use client"

import { TilesContextProvider } from "@/contexts/TileContext"
import TileDestroyer from "./TileDestroyer"
import { Card } from "antd"

const MapManager = () => {

  return (
    <Card>
      <div style={{ margin: '10px' }}>
        <h3 style={{ marginBottom: '10px' }}>Map Manager Menu</h3>
        <TilesContextProvider>
          <TileDestroyer />
        </TilesContextProvider>
      </div>
    </Card>
  )
}

export default MapManager