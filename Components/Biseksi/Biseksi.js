import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/InterPolyLenier.module.css";
import BiseksiStyles from "../../styles/Biseksi.module.css";
import LineChart from "../LineChart";
import { IntegerState } from "../IntegerGlobalState";
import { DatasState } from "../DatasContainer";
import { AppPathState } from "../AppPath";
import Script from "next/script";
// import styles from "../../styles/Home.module.css";

function BiseksiWindow() {
  const [editX, setEditX] = useState();
  const [editY, setEditY] = useState();
  const [ttkTarget, setTtkTarget] = useState();
  const [mncariTitiktrdkt, setMncariTitikTrdkt] = useState();
  const [xYgDicari, setXygDicari] = useState();
  const [editXvalue, setEditXvalue] = useState();
  const [editYvalue, setEditYvalue] = useState();
  const [xDataValues, setXDataValues] = useState();
  const [yDataValues, setYDataValues] = useState();
  const [isInteger, setIsInteger] = useContext(IntegerState);
  const [getDatas, setDatas] = useContext(DatasState);
  const [getAppPath, setAppPath] = useContext(AppPathState);
  const [batasTengah, setBatasTengah] = useState(null);
  const [akarTarget, setAkaraTarget] = useState();
  const [toleransiE, setToleransiE] = useState(0.0001);
  // const [getDatas.datasContainer.interpol.lenier, setgetDatas.datasContainer.interpol.lenier] = useState(getDatas.datasContainer.interpol.lenier);
  const [graphDatas, setGraphDatas] = useState({
    labels: [mncariTitiktrdkt?.titikPertama.x, mncariTitiktrdkt?.titikKedua.x],
    datasets: [
      {
        label: "Interpolasi Polynomial Lenier",
        // lineTension: 0.4,
        radius: 5,
        data: [
          mncariTitiktrdkt?.titikPertama.y,
          mncariTitiktrdkt?.titikKedua.y,
        ],
      },
    ],
  });
  getDatas.datasContainer.interpol.lenier.sort((a, b) => a.x + b.x);
  const router = useRouter();
  useEffect(() => {
    setGraphDatas({
      labels: [
        mncariTitiktrdkt?.titikPertama.x,
        mncariTitiktrdkt?.titikKedua.x,
      ],
      datasets: [
        {
          label: "Interpolasi Polynomial Lenier",
          // lineTension: 0.4,
          radius: 5,
          data: [
            mncariTitiktrdkt?.titikPertama.y,
            mncariTitiktrdkt?.titikKedua.y,
          ],
        },
      ],
    });
    setAppPath("InterPolLenier");
  }, [xYgDicari]);
  const BeginBisection = (batasAtas, batasBawah, eRA) => {
    let loopLimits = 1;
    let btsAtas = batasAtas;
    let btsBwh = batasBawah;
    let btsTngh = (btsAtas + btsBwh) / 2;
    const perPangkatan = (nilai, pangkat) => {
      let hasilnya = nilai;
      for (let n = 1; n < pangkat; n++) {
        hasilnya = hasilnya * nilai;
      }
      //   console.log(hasilnya);
      return hasilnya;
    };

    const fX = (x) => {
      return perPangkatan(x, 3) + perPangkatan(x, 2) - 2 * x - 2;
    };
    while (btsBwh - btsAtas >= eRA) {
      console.log(`${loopLimits}`+{ btsTngh, eps: btsBwh - btsAtas });
      // setBatasTengah((btsAtas + btsBwh) / 2);
      if (fX(btsAtas) * fX(btsTngh) > 0) {
        btsAtas = btsTngh;
      } else if (fX(btsAtas) * fX(btsTngh) < 0) {
        btsBwh = btsTngh;
      }
      btsTngh = (btsAtas + btsBwh) / 2;
      if (loopLimits == 1000) {
        break;
      }
      loopLimits++;
      console.log(`${loopLimits}`+{ btsTngh, eps: btsBwh - btsAtas });
    }
    console.log({ iterasi: loopLimits });
    return btsTngh;
  };
  // console.log(perPangkatan(2, 3));
  // console.log(BeginBisection(1, 2, 0.0001));

  const FormEditData = ({ depsData }) => {
    if (depsData === "x") {
      return (
        getDatas.datasContainer.biseksi &&
        getDatas.datasContainer.biseksi.batasAtas.map((data, index) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!!e.target.inputNilai.value) {
                cariAkar(
                  getDatas.datasContainer.biseksi.batasBawah[0],
                  getDatas.datasContainer.biseksi.batasBawah[0]
                );

                if (
                  getDatas.datasContainer.biseksi.batasBawah[
                    getDatas.datasContainer.biseksi.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    )
                  ] === "DummyData"
                ) {
                  alert("isi sumbu Y dulu");
                } else if (
                  getDatas.datasContainer.biseksi.batasBawah[
                    getDatas.datasContainer.biseksi.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    )
                  ] !== "DummyData" &&
                  getDatas.datasContainer.biseksi.batasAtas[
                    getDatas.datasContainer.biseksi.batasAtas.findIndex(
                      (data) => data == "DummyData"
                    )
                  ] === "DummyData"
                ) {
                  // getDatas.datasContainer.biseksi.batasAtas[editXvalue.index] =
                  //   editXvalue.value;
                  getDatas.datasContainer.biseksi.batasAtas.fill(
                    xDataValues,
                    getDatas.datasContainer.biseksi.batasAtas.findIndex(
                      (data) => data == "DummyData"
                    ),
                    getDatas.datasContainer.biseksi.batasAtas.findIndex(
                      (data) => data == "DummyData"
                    ) + 1
                  );
                  setEditX([]);
                } else if (getDatas.datasContainer.biseksi.batasBawah[index] !== "DummyData") {
                  getDatas.datasContainer.biseksi.batasAtas.fill(
                    xDataValues,
                    index,
                    index + 1
                  );
                  setEditX();
                }
              }
            }}
            key={index}
          >
            <div
              className={styles.tableDatas_Contents}
              onClick={(e) => {
                if (e.detail === 2) {
                  setXDataValues(getDatas.datasContainer.biseksi.batasBawah[index]);
                  setEditX(index);
                  setEditY([]);
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
                }
              }}
            >
              {data}
            </div>
            {editX === index && (
              <input
                type="number"
                autoFocus
                name="inputNilai"
                onChange={(e) => {
                  setXDataValues(parseInt(e.target.value));
                  setEditXvalue({
                    value: parseInt(e.target.value),
                    index: index,
                  });
                }}
                value={xDataValues}
              />
            )}
          </form>
        ))
      );
    } else if (depsData === "y") {
      return (
        getDatas.datasContainer.biseksi &&
        getDatas.datasContainer.biseksi.batasBawah.map((data, index) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!!e.target.inputNilai.value) {
                // getDatas.datasContainer.interpol.lenier[editYvalue.index].y = editYvalue.value;
                cariAkar(
                  getDatas.datasContainer.biseksi.batasBawah[0],
                  getDatas.datasContainer.biseksi.batasBawah[0]
                );
                if (
                  getDatas.datasContainer.biseksi.batasBawah[
                    getDatas.datasContainer.biseksi.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    )
                  ] === "DummyData"
                ) {
                  getDatas.datasContainer.biseksi.batasBawah.fill(
                    yDataValues,
                    getDatas.datasContainer.biseksi.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    ),
                    getDatas.datasContainer.biseksi.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    ) + 1
                  );
                  setEditY([]);
                } else if (getDatas.datasContainer.biseksi.batasBawah[editY] !== "DummyData") {
                  getDatas.datasContainer.biseksi.batasBawah.fill(
                    yDataValues,
                    index,
                    index + 1
                  );
                  setEditY([]);
                }
              }
            }}
            key={index}
          >
            <div
              className={styles.tableDatas_Contents}
              onClick={(e) => {
                if (e.detail === 2) {
                  setXDataValues(getDatas.datasContainer.biseksi.batasAtas[index]);
                  setYDataValues(getDatas.datasContainer.biseksi.batasBawah[index]);
                  setEditX([]);
                  setEditY(index);
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
                }
              }}
            >
              {data}
            </div>
            {editY === index && (
              <input
                type="number"
                autoFocus
                name="inputNilai"
                onChange={(e) => {
                  setYDataValues(parseFloat(e.target.value));
                  setEditYvalue({
                    value: parseFloat(e.target.value),
                    index: index,
                  });
                }}
                value={yDataValues}
              />
            )}
          </form>
        ))
      );
    } else if (depsData === "deleteBtn") {
      return (
        getDatas.datasContainer.biseksi &&
        getDatas.datasContainer.biseksi.batasAtas.map((data, index) => (
          <div className={styles.tableDatas_Icon} key={index}>
            {(editX === index || editY === index) && (
              <box-icon
                name="x-circle"
                color="#e78ea9"
                animation="tada-hover"
                onClick={() => {
                  if (
                    getDatas.datasContainer.biseksi.batasBawah[
                      getDatas.datasContainer.biseksi.batasBawah.findIndex(
                        (data) => data == "DummyData"
                      )
                    ] == "DummyData" ||
                    getDatas.datasContainer.biseksi.batasAtas[
                      getDatas.datasContainer.biseksi.batasAtas.findIndex(
                        (data) => data == "DummyData"
                      )
                    ] == "DummyData"
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
                  router.replace(router.asPath);
                  setEditX([]);
                  setEditY([]);
                }}
                customTitle="Batal"
              ></box-icon>
            )}
            {getDatas.datasContainer.biseksi.batasBawah[
              getDatas.datasContainer.biseksi.batasBawah.findIndex(
                (data) => data == "DummyData"
              )
            ] !== "DummyData" && (
              <box-icon
                name="trash"
                color="#e78ea9"
                animation="tada-hover"
                onClick={() => {
                  getDatas.datasContainer.biseksi.batasAtas.splice(index, 1);
                  getDatas.datasContainer.biseksi.batasBawah.splice(index, 1);
                  router.replace(router.asPath);
                  setEditX([]);
                  setEditY([]);
                }}
              ></box-icon>
            )}
          </div>
        ))
      );
    }
  };
  const cariAkar = (batasAtas, batasBawah) => {
    if (!!getDatas.datasContainer.biseksi.batasBawah[0] && !!getDatas.datasContainer.biseksi.batasAtas[0]) {
      let akarTrgt = BeginBisection(batasAtas, batasBawah, toleransiE);
      setAkaraTarget(akarTrgt);
    }
  };
  return (
    <>
      <div className={styles.ioExecution_sheet}>
        <div className={styles.userInput}>
          <div className={BiseksiStyles.sumbuContainer}>
            <div className={styles.findXContainer}>
              <input
                className={styles.findX_input}
                type="number"
                autoFocus
                placeholder="Toleransi (eRA)"
                onChange={(e) => {
                  setToleransiE(e.target.value);
                  console.log(parseFloat(e.target.value));
                  cariAkar(
                    getDatas.datasContainer.biseksi.batasAtas[0],
                    getDatas.datasContainer.biseksi.batasBawah[0]
                  );
                }}
                value={toleransiE}
              />
            </div>
          </div>
          <div className={styles.tableDatasContainer}>
            <div className={styles.tableDatas}>
              <div className={styles.tableDatas_columnContainer}>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    n<sup></sup>
                  </div>
                  {getDatas.datasContainer.biseksi &&
                    getDatas.datasContainer.biseksi.batasAtas.map((data, index) => (
                      <div className={styles.tableDatas_Contents} key={index}>
                        {index + 1}
                      </div>
                    ))}
                </div>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    <sup>X</sup>n
                  </div>
                  <FormEditData depsData="x" />
                </div>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    <sup>Y</sup>n
                  </div>
                  <FormEditData depsData="y" />
                </div>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    <sup>Y</sup>
                  </div>
                  <FormEditData depsData="deleteBtn" />
                </div>
              </div>
              <div
                className={styles.entryNewData}
                onClick={() => {
                  getDatas.datasContainer.biseksi.batasAtas.push("DummyData");
                  getDatas.datasContainer.biseksi.batasBawah.push("DummyData");
                  // router.replace(router.asPath);
                  setEditX(getDatas.datasContainer.biseksi.batasAtas.length - 1);
                  setEditY(getDatas.datasContainer.biseksi.batasBawah.length - 1);
                }}
              >
                <box-icon
                  name="list-plus"
                  color="#e78ea9"
                  animation="tada"
                ></box-icon>
                Tambahkan Data
              </div>
            </div>
          </div>
        </div>
        <div className={styles.prosesReults}>
          <div className={styles.prosessResults_Graph}>
            <div className={styles.prosessResults_graphheading}>Graph</div>
            <div className={styles.prosessResults_graphResult}>
              {/* <LineChart datas={graphDatas} /> */}
            </div>
          </div>
          <div className={styles.prosessResults_tableResult}>
            <div className={styles.prosessResults_Heading}>Result</div>
            <div className={BiseksiStyles.biseksiResults}>
              {getDatas.datasContainer.biseksi.batasAtas && `Akar Yang Di Cari: ${akarTarget}`}
            </div>
          </div>
        </div>
      </div>
      <Script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js" />
    </>
  );
}

export default BiseksiWindow;
