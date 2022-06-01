import { useEffect, useContext } from "react";
import { DatasState } from "../DatasContainer";
function DeleteDummyDatas() {
  const [getDatas, setDatas] = useContext(DatasState);
  return (
    // check and delete dummy datas on first render
    useEffect(() => {
      if (
        getDatas.datasContainer.RegulaFalsi.batasAtas[
          getDatas.datasContainer.RegulaFalsi.batasAtas.findIndex(
            (data) => data == "DummyData"
          )
        ] === "DummyData" &&
        getDatas.datasContainer.RegulaFalsi.batasAtas[
          getDatas.datasContainer.RegulaFalsi.batasAtas.findIndex(
            (data) => data == "DummyData"
          )
        ] === "DummyData"
      ) {
        getDatas.datasContainer.RegulaFalsi.batasAtas.splice(
          getDatas.datasContainer.RegulaFalsi.batasAtas.findIndex(
            (data) => data == "DummyData"
          ),
          1
        );
        getDatas.datasContainer.RegulaFalsi.batasBawah.splice(
          getDatas.datasContainer.RegulaFalsi.batasBawah.findIndex(
            (data) => data == "DummyData"
          ),
          1
        );
      }
      if (
        getDatas.datasContainer.biseksi.batasAtas[
          getDatas.datasContainer.biseksi.batasAtas.findIndex(
            (data) => data == "DummyData"
          )
        ] === "DummyData" &&
        getDatas.datasContainer.biseksi.batasAtas[
          getDatas.datasContainer.biseksi.batasAtas.findIndex(
            (data) => data == "DummyData"
          )
        ] === "DummyData"
      ) {
        getDatas.datasContainer.biseksi.batasAtas.splice(
          getDatas.datasContainer.biseksi.batasAtas.findIndex(
            (data) => data == "DummyData"
          ),
          1
        );
        getDatas.datasContainer.biseksi.batasBawah.splice(
          getDatas.datasContainer.biseksi.batasBawah.findIndex(
            (data) => data == "DummyData"
          ),
          1
        );
      }
      if (
        getDatas.datasContainer.Secant.batasAtas[
          getDatas.datasContainer.Secant.batasAtas.findIndex(
            (data) => data == "DummyData"
          )
        ] === "DummyData" &&
        getDatas.datasContainer.Secant.batasAtas[
          getDatas.datasContainer.Secant.batasAtas.findIndex(
            (data) => data == "DummyData"
          )
        ] === "DummyData"
      ) {
        getDatas.datasContainer.Secant.batasAtas.splice(
          getDatas.datasContainer.Secant.batasAtas.findIndex(
            (data) => data == "DummyData"
          ),
          1
        );
        getDatas.datasContainer.Secant.batasBawah.splice(
          getDatas.datasContainer.Secant.batasBawah.findIndex(
            (data) => data == "DummyData"
          ),
          1
        );
      }
    }, [])
  );
}

export default DeleteDummyDatas;
