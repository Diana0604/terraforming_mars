"use client";
import { TilesContextProvider } from "@/contexts/TileContext";
import { RoundContextProvider } from "@/contexts/RoundContext";
import { AlertContextProvider } from "@/contexts/AlertContext";
import InitialResourcesContextProvider from "@/contexts/InitialResourcesContext";
import InitialBuildingContextProvider from "@/contexts/InitialBuildingContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <InitialResourcesContextProvider>
        <InitialBuildingContextProvider>
          <TilesContextProvider>
            <RoundContextProvider>
              <AlertContextProvider>{children}</AlertContextProvider>
            </RoundContextProvider>
          </TilesContextProvider>
        </InitialBuildingContextProvider>
      </InitialResourcesContextProvider>
    </div>
  );
};

export default Providers;
