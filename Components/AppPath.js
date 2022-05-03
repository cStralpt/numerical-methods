import { createContext, useState } from "react";

export const AppPathState = createContext();
function AppPath({children}) {
    const [getAppPath, setAppPath] = useState();
    return (
      <AppPathState.Provider value={[getAppPath, setAppPath]}>
        {children}
      </AppPathState.Provider>
    );
}

export default AppPath