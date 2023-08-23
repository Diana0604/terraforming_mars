"use client"
import { CorporationsContextProvider } from "@/contexts/CorporationsContexts"
import { TilesContextProvider } from "@/contexts/TileContext"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <CorporationsContextProvider>
      <TilesContextProvider>
        {children}
      </TilesContextProvider>
    </CorporationsContextProvider>
  </div>
}

export default Providers