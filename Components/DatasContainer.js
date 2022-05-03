import { createContext, useState } from "react";
export const DatasState = createContext();
function DatasContainer({ children }) {
  const datas = {
    interpol: {
      lenier: [
        { x: 2010, y: 7481604 },
        { x: 2013, y: 7828740 },
        { x: 2025, y: 10974825 },
        { x: 2016, y: 8160901 },
      ],
      kuadratik: [
        { x: 8, y: 10 },
        { x: 1, y: 5 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 6, y: 16 },
      ],
    },
  };
  const [getDatas, setDatas] = useState(datas);
  return (
    <DatasState.Provider value={[getDatas, setDatas]}>
      {children}
    </DatasState.Provider>
  );
}

export default DatasContainer;
