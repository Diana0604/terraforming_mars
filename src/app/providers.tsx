"use client"
import { CorporationsContextProvider } from "@/contexts/CorporationsContexts"
import { TilesContextProvider } from "@/contexts/TileContext"
import { RoundContextProvider } from "@/contexts/RoundContext"
import { AlertContextProvider } from "@/contexts/AlertContext"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <CorporationsContextProvider>
      <TilesContextProvider>
        <RoundContextProvider>
          <AlertContextProvider>
            {children}
          </AlertContextProvider>
        </RoundContextProvider>
      </TilesContextProvider>
    </CorporationsContextProvider>
  </div>
}

export default Providers