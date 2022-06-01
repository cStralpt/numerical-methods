import { createContext, useState } from "react";
export const akarPersamaanState = createContext();
function AkarPrsmnState({ children }) {
  const [getAkarPrsmnWindow, setAkarPrsmnWindow] = useState(false);
  return (
    <akarPersamaanState.Provider value={[getAkarPrsmnWindow, setAkarPrsmnWindow]}>
      {children}
    </akarPersamaanState.Provider>
  );
}

export default AkarPrsmnState;
