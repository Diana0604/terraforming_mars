
import { ALERT_MANAGER_ROUTE } from "@/constants";
import React, { useState, useEffect } from "react";

//tiles can be accessed from context
type contextProps = {
    message: string;
}

//initial corporation values
const initialAlertProps: contextProps = {
    message: ""
};

//build context
export const AlertContext: React.Context<contextProps> = React.createContext(initialAlertProps);

//build context provider
export const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {

  //corporation objects and setters
  const [message, setMessage] = useState<string>(initialAlertProps.message)


  useEffect(() => {

    //update round info every second by fetching from database
    const updateMessage = () => {
      try {
        fetch(ALERT_MANAGER_ROUTE, { method: 'get' }).then(async response => {
          const data = await response.json();
          if(data)
            setMessage(data.message)
        }, (error) => { console.log('error on fetch', error) })
      } catch (error) {
        console.log('error on fetch', error)
      }
    }

    updateMessage()

    // const gameInterval = Math.floor(1000*SECONDS_PER_ROUND*5/1440)
    // console.log(gameInterval)
    const interval = setInterval(updateMessage, 1000)

    //destroy interval at dismount
    return () => {
      clearInterval(interval)
    }
  }, [])

  //return provider values
  return (
    <AlertContext.Provider value={{ message }}>
      {children}
    </AlertContext.Provider>
  );
};

