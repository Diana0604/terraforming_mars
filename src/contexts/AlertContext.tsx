import { ALERT_MANAGER_ROUTE } from "@/constants";
import { fetchGet } from "@/functions/database/database.fetchers";
import React, { useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";

//tiles can be accessed from context
type contextProps = {
  message: string;
};

//initial corporation values
const initialAlertProps: contextProps = {
  message: "",
};

//build context
export const AlertContext: React.Context<contextProps> =
  React.createContext(initialAlertProps);

//build context provider
export const AlertContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //corporation objects and setters
  const [message, setMessage] = useState<string>(initialAlertProps.message);

  const updateMessageCallback = (data: { message: string }) => {
    if (data) setMessage(data.message);
    else setMessage("");
  };

  //update round info every second by fetching from database
  const updateMessage = () =>
    fetchGet(ALERT_MANAGER_ROUTE, updateMessageCallback);

  useInterval(updateMessage, 1000);

  //return provider values
  return (
    <AlertContext.Provider value={{ message }}>
      {children}
    </AlertContext.Provider>
  );
};
