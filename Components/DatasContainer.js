import { createContext, useState } from "react";
import Interpolasipolynomial from "/Components/Methods/InterpolasiPolynomial";
import Biseksi from "/Components/Methods/Biseksi";
import RegulaFalsi from "/Components/Methods/RegulaFalsi";
import Secant from "/Components/Methods/Secant";
import IterasiTitikTetap from "/Components/Methods/IterasiTitikTetap";
export const DatasState = createContext();
function DatasContainer({ children }) {
  const datas = {
    methods: [
      {
        methodId: "Interpolasi Polynomial",
        slug: "interpolasi-polynomial",
        component: <Interpolasipolynomial />,
      },
      {
        methodId: "Biseksi",
        slug: "biseksi",
        component: <Biseksi />,
      },
      {
        methodId: "Regula Falsi",
        slug: "regula-falsi",
        component: <RegulaFalsi />,
      },
      {
        methodId: "Secant",
        slug: "secant",
        component: <Secant />,
      },
      {
        methodId: "Iterasi Titik Tetap",
        slug: "iterasi-titik-tetap",
        component: <IterasiTitikTetap />,
      },
    ],
    datasContainer: {
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
      biseksi: {
        batasAtas: [1],
        batasBawah: [2],
        akarPrsmn: [3, 2, 2],
      },
      RegulaFalsi: {
        batasAtas: [-5],
        batasBawah: [1],
      },
      Secant: {
        batasAtas: [-2],
        batasBawah: [3],
      },
      IterasiTitikTetap: {
        batasAtas: [4],
      },
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
