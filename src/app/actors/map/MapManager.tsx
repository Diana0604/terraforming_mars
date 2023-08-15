"use client"

import { TilesContextProvider } from "@/contexts/TileContext"
import TileDestroyer from "./TileDestroyer"

const MapManager = () => {

  return (
    <div style={{ margin: '10px' }}>
      <h3 style={{marginBottom: '10px'}}>Map Manager Menu</h3>
      <TilesContextProvider>
        <TileDestroyer />
      </TilesContextProvider>
    </div>
  )
}

export default MapManager