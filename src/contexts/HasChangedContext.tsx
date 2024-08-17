import { createContext, Dispatch, SetStateAction, useState } from "react";

interface HasChangedProps {
  hasChanged: boolean,
  setHasChanged: Dispatch<SetStateAction<boolean>>
}

const initProps : HasChangedProps = {
  hasChanged: false,
  setHasChanged : () => {}
}

export const HasChangedContext = createContext<HasChangedProps>(initProps);

const HasChangedContextProvider = ({children} : {children: React.ReactNode}) => {

  const [hasChanged, setHasChanged] = useState(false);

  return <HasChangedContext.Provider value={{hasChanged, setHasChanged}}>{children}</HasChangedContext.Provider>
}
export default HasChangedContextProvider