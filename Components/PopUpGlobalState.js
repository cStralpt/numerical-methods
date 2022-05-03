import { createContext, useState } from "react";

export const PopupCtx = createContext();
function PopupCmpGState({ children }) {
  const [popUpstate, setPopupState] = useState(false);
  return (
    <PopupCtx.Provider value={[popUpstate, setPopupState]}>
      {children}
    </PopupCtx.Provider>
  );
}

export default PopupCmpGState;
