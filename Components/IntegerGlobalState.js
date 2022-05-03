import { createContext, useState } from "react";

export const IntegerState = createContext();
function IntegerGlobalState({ children }) {
  const [isInteger, setIsInteger] = useState(true);
  return (
    <IntegerState.Provider value={[isInteger, setIsInteger]}>
      {children}
    </IntegerState.Provider>
  );
}

export default IntegerGlobalState;
