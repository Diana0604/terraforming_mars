"use client"
import { CorporationsContextProvider } from "@/contexts/CorporationsContexts"
import { TilesContextProvider } from "@/contexts/TileContext"
import { RoundContextProvider } from "@/contexts/RoundContext"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <CorporationsContextProvider>
      <TilesContextProvider>
        <RoundContextProvider>
          {children}
        </RoundContextProvider>
      </TilesContextProvider>
    </CorporationsContextProvider>
  </div>
}

export default Providers