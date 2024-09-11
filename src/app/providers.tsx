"use client"
import { TilesContextProvider } from "@/contexts/TileContext"
import { RoundContextProvider } from "@/contexts/RoundContext"
import { AlertContextProvider } from "@/contexts/AlertContext"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <div>
      <TilesContextProvider>
        <RoundContextProvider>
          <AlertContextProvider>
            {children}
          </AlertContextProvider>
        </RoundContextProvider>
      </TilesContextProvider>
  </div>
}

export default Providers