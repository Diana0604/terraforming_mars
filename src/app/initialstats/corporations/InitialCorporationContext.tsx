"use client"
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Corporation } from "@/types";
import { INIT_CORPORATION_ROUTE } from "@/constants";

interface initialStatsProps {
  corporations: Corporation[];
}

const initProps = {
  corporations: [],
};

export const InitialStatsContext = createContext<initialStatsProps>(initProps);

const InitialStatsContextProvider = ({ children }: { children: ReactNode }) => {
  const [corporations, setCorporations] = useState<Corporation[]>([]);

  useEffect(() => {
    //get params for init corporations
    fetch(INIT_CORPORATION_ROUTE, { method: "get" }).then(
      async (response) => {
        console.log('got response')
        const data = await response.json();
        console.log(data);
        setCorporations(data.corporations);
      },
      (error) => {
        console.log("error on fetch", error);
      }
    );
  }, []);

  return (
    <InitialStatsContext.Provider value={{ corporations }}>
      {children}
    </InitialStatsContext.Provider>
  );
};

export default InitialStatsContextProvider;
