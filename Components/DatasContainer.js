import { createContext, useState } from "react";
import Interpolasipolynomial from "/Components/Methods/InterpolasiPolynomial";
import Bijeksi from "/Components/Methods/Bijeksi";
import RegulaFalsi from "/Components/Methods/RegulaFalsi";
import Secant from "/Components/Methods/Secant";
import IterasiTitikTetap from "/Components/Methods/IterasiTitikTetap";
import NewtonRaphson from "/Components/Methods/NewtonRaphson";
import EliminasiGauss from "/Components/Methods/EliminasiGauss";
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
        methodId: "Bijeksi",
        slug: "bijeksi",
        component: <Bijeksi />,
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
      {
        methodId: "Newton Raphson",
        slug: "newton-raphson",
        component: <NewtonRaphson />,
      },
      // {
      //   methodId: "Eliminasi Gauss",
      //   slug: "eliminasi-gauss",
      //   component: <EliminasiGauss />,
      // },
    ],
    datasContainer: {
      interpol: {
        lenier: [
          { x: 2010, y: 7481604 },
          { x: 2013, y: 7828740 },
          { x: 2020, y: 8567923 },
          { x: 2016, y: 8160901 },
          { x: 2018, y: 8370320 },
        ],
        kuadratik: [
          { x: 2010, y: 35.8 },
          { x: 2015, y: 36.5 },
          { x: 2020, y: 37.3 },
          { x: 2025, y: 38.2 },
          { x: 2030, y: 39.1 },
          { x: 2035, y: 40.1 },
          // { x: 8, y: 10 },
          // { x: 1, y: 5 },
          // { x: 2, y: 2 },
          // { x: 3, y: 3 },
          // { x: 6, y: 16 },
        ],
      },
      Bijeksi: {
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
      NewtonRaphson: {
        batasAtas: [5],
      },
      EliminasiGauss: {
        variabkePersamaan: [
          [1, -2, 1, 6],
          [3, 1, -2, 4],
          [7, -6, -1, 10],
        ],
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
