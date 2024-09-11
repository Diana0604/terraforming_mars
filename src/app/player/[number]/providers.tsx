"use client";

import IndividualCorporationContextProvider from "@/app/actors/corporation/IndividualCorporation/IndividualCorporationContext";
import { CORPORATION_ROUTE } from "@/constants";
import { fetchGet } from "@/functions/database/database.fetchers";
import { Corporation } from "@/types";
import { useEffect, useState } from "react";

interface ProviderProps {
  children: React.ReactNode;
  number: number;
}

const Providers = ({ children, number }: ProviderProps) => {
  // corporation name state
  const [corporationName, setCorporationName] = useState<string>("");

  //when response from database -> update coproration name
  const handleGetCorporations = (data: { corporations: Corporation[] }) => {
    if (data.corporations.length < number + 1) return;
    setCorporationName(data.corporations[number].name);
  };

  // fetch corporation at init
  useEffect(() => {
    fetchGet(CORPORATION_ROUTE, handleGetCorporations);
  });

  // check number in url is correct
  if (isNaN(number) || number < 0)
    return <div>Number needs to be a number greater than 0</div>;

  return (
    <div>
      <IndividualCorporationContextProvider name={corporationName}>
        {children}
      </IndividualCorporationContextProvider>
    </div>
  );
};

export default Providers;
