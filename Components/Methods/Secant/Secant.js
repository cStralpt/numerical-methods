import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "/styles/InterPolyLenier.module.css";
import BijeksiStyles from "../../../styles/Bijeksi.module.css";
import { IntegerState } from "../../IntegerGlobalState";
import { DatasState } from "../../DatasContainer";
import { AppPathState } from "../../AppPath";
import Script from "next/script";
import { akarPersamaanState } from "../../AkarPrsmnState";
import DeleteDummyDatas from "../../MikroCMPs/DeleteDummyDatas";
import AkarPrsmnWindow from "../../MikroCMPs/AkarPrsmnWindow";
// import styles from "../../styles/Home.module.css";

function SecantWindow() {
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
  const [isDataChecked, setCheckedData] = useState();
  const [getLoopLimits, setLoopLimits] = useState(1000);
  const [totalIterasi, setTotalIterasi] = useState();
  const [getAkarPrsmnWindow, setAkarPrsmnWindow] =
    useContext(akarPersamaanState);
  const router = useRouter();
  DeleteDummyDatas();
  const BeginSecant = (batasAtas, batasBawah, eRA) => {
    const perPangkatan = (nilai, pangkat) => {
      let hasilnya = nilai;
      for (let n = 1; n < pangkat; n++) {
        hasilnya = hasilnya * nilai;
      }
      //   console.log(hasilnya);
      return hasilnya;
    };
    const fX = (x) => {
      return perPangkatan(x, 3) + perPangkatan(x, 2) - 3 * x - 3;
    };
    let loopLimits = 1;
    let btsAtas = batasAtas;
    let btsBwh = batasBawah;
    let btsTngh =
      btsBwh - (fX(btsBwh) * (btsBwh - btsAtas)) / (fX(btsBwh) - fX(btsAtas));

    while (eRA < Math.abs(fX(btsTngh))) {
      // setBatasTengah((btsAtas + btsBwh) / 2);
      if (fX(btsAtas) * fX(btsTngh) > 0) {
        btsAtas = btsTngh;
      } else if (fX(btsAtas) * fX(btsTngh) < 0) {
        btsBwh = btsTngh;
      }
      btsTngh = (btsAtas + btsBwh) / 2;
      if (loopLimits == getLoopLimits) {
        break;
      }
      loopLimits++;
      setTotalIterasi(loopLimits);
    }
    return btsTngh;
  };
  // console.log(perPangkatan(2, 3));
  // console.log(BeginSecant(1, 2, 0.0001));

  const FormEditData = ({ depsData }) => {
    if (depsData === "x") {
      return (
        getDatas.datasContainer.Secant &&
        getDatas.datasContainer.Secant.batasAtas.map((data, index) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!!e.target.inputNilai.value) {
                cariAkar(
                  getDatas.datasContainer.Secant.batasBawah[0],
                  getDatas.datasContainer.Secant.batasBawah[0]
                );

                if (
                  getDatas.datasContainer.Secant.batasBawah[
                    getDatas.datasContainer.Secant.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    )
                  ] === "DummyData"
                ) {
                  alert("isi sumbu Y dulu");
                } else if (
                  getDatas.datasContainer.Secant.batasBawah[
                    getDatas.datasContainer.Secant.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    )
                  ] !== "DummyData" &&
                  getDatas.datasContainer.Secant.batasAtas[
                    getDatas.datasContainer.Secant.batasAtas.findIndex(
                      (data) => data == "DummyData"
                    )
                  ] === "DummyData"
                ) {
                  // getDatas.datasContainer.Secant.batasAtas[editXvalue.index] =
                  //   editXvalue.value;
                  getDatas.datasContainer.Secant.batasAtas.fill(
                    xDataValues,
                    getDatas.datasContainer.Secant.batasAtas.findIndex(
                      (data) => data == "DummyData"
                    ),
                    getDatas.datasContainer.Secant.batasAtas.findIndex(
                      (data) => data == "DummyData"
                    ) + 1
                  );
                  setEditX([]);
                } else if (
                  getDatas.datasContainer.Secant.batasBawah[index] !==
                  "DummyData"
                ) {
                  getDatas.datasContainer.Secant.batasAtas.fill(
                    xDataValues,
                    index,
                    index + 1
                  );
                  setEditX();
                  setCheckedData();
                }
              }
            }}
            key={index}
          >
            <div
              className={styles.tableDatas_Contents}
              onClick={(e) => {
                if (e.detail === 2) {
                  setXDataValues(
                    getDatas.datasContainer.Secant.batasBawah[index]
                  );
                  setEditX(index);
                  setEditY([]);
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
        getDatas.datasContainer.Secant &&
        getDatas.datasContainer.Secant.batasBawah.map((data, index) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!!e.target.inputNilai.value) {
                // getDatas.datasContainer.interpol.lenier[editYvalue.index].y = editYvalue.value;
                cariAkar(
                  getDatas.datasContainer.Secant.batasBawah[0],
                  getDatas.datasContainer.Secant.batasBawah[0]
                );
                if (
                  getDatas.datasContainer.Secant.batasBawah[
                    getDatas.datasContainer.Secant.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    )
                  ] === "DummyData"
                ) {
                  getDatas.datasContainer.Secant.batasBawah.fill(
                    yDataValues,
                    getDatas.datasContainer.Secant.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    ),
                    getDatas.datasContainer.Secant.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    ) + 1
                  );
                  setEditY([]);
                } else if (
                  getDatas.datasContainer.Secant.batasBawah[editY] !==
                  "DummyData"
                ) {
                  getDatas.datasContainer.Secant.batasBawah.fill(
                    yDataValues,
                    index,
                    index + 1
                  );
                  setEditY([]);
                  setCheckedData();
                }
              }
            }}
            key={index}
          >
            <div
              className={styles.tableDatas_Contents}
              onClick={(e) => {
                if (e.detail === 2) {
                  setXDataValues(
                    getDatas.datasContainer.Secant.batasAtas[index]
                  );
                  setYDataValues(
                    getDatas.datasContainer.Secant.batasBawah[index]
                  );
                  setEditX([]);
                  setEditY(index);
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
        getDatas.datasContainer.Secant &&
        getDatas.datasContainer.Secant.batasAtas.map((data, index) => (
          <div className={styles.tableDatas_Icon} key={index}>
            {(editX === index || editY === index) && (
              <>
                <box-icon
                  name="x-circle"
                  color="#e78ea9"
                  animation="tada-hover"
                  onClick={() => {
                    if (
                      getDatas.datasContainer.Secant.batasBawah[
                        getDatas.datasContainer.Secant.batasBawah.findIndex(
                          (data) => data == "DummyData"
                        )
                      ] == "DummyData" ||
                      getDatas.datasContainer.Secant.batasAtas[
                        getDatas.datasContainer.Secant.batasAtas.findIndex(
                          (data) => data == "DummyData"
                        )
                      ] == "DummyData"
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
                    router.replace(router.asPath);
                    setEditX([]);
                    setEditY([]);
                  }}
                  customTitle="Batal"
                ></box-icon>
              </>
            )}
            {getDatas.datasContainer.Secant.batasBawah[
              getDatas.datasContainer.Secant.batasBawah.findIndex(
                (data) => data == "DummyData"
              )
            ] !== "DummyData" && (
              // update
              <>
                <i
                  className="bx bx-trash bx-tada-hover"
                  onClick={() => {
                    getDatas.datasContainer.Secant.batasAtas.splice(index, 1);
                    getDatas.datasContainer.Secant.batasBawah.splice(index, 1);
                    router.replace(router.asPath);
                    setEditX([]);
                    setEditY([]);
                  }}
                ></i>
                <div
                  className={styles.checkBoxContainer}
                  onClick={() => {
                    cariAkar(
                      getDatas.datasContainer.Secant.batasAtas[index],
                      getDatas.datasContainer.Secant.batasBawah[index]
                    );
                    setCheckedData(index);
                  }}
                >
                  <input
                    type="radio"
                    name="data_checked"
                    checked={index === isDataChecked ? true : false}
                  />
                  <div className={styles.checkBox}>
                    <i className="bx bx-checkbox"></i>
                  </div>
                  <div className={styles.checkBox}>
                    <i className="bx bx-checkbox-checked"></i>
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      );
    }
  };
  const cariAkar = (batasAtas, batasBawah) => {
    if (
      !!getDatas.datasContainer.Secant.batasBawah[0] &&
      !!getDatas.datasContainer.Secant.batasAtas[0]
    ) {
      let akarTrgt = BeginSecant(batasAtas, batasBawah, toleransiE);
      setAkaraTarget(akarTrgt);
    }
  };
  return (
    <>
      <div className={styles.ioExecution_sheet}>
        <div className={styles.userInput}>
          {/* Update */}
          <div className={BijeksiStyles.loopLimits_toleransiError}>
            <div className={BijeksiStyles.loopLimits_Container}>
              <label
                className={BijeksiStyles.loopLimits_label}
                for="loopLimits"
              >
                Loop Limits
              </label>
              <input
                className={BijeksiStyles.loopLimits_input}
                id="loopLimits"
                type="number"
                onChange={(e) => {
                  setLoopLimits(e.target.value);
                  setCheckedData();
                }}
                placeholder="masukan batas iterasi"
                value={getLoopLimits}
              />
            </div>
            <div className={BijeksiStyles.sumbuContainer}>
              <div className={styles.findXContainer}>
                <input
                  className={styles.findX_input}
                  type="number"
                  autoFocus
                  placeholder="Toleransi (eRA)"
                  onChange={(e) => {
                    setToleransiE(e.target.value);
                    cariAkar(
                      getDatas.datasContainer.Secant.batasAtas[0],
                      getDatas.datasContainer.Secant.batasBawah[0]
                    );
                    setCheckedData();
                  }}
                  value={toleransiE}
                />
              </div>
            </div>
          </div>
          <div className={styles.tableDatasContainer}>
            {/* <Table /> */}
            <div className={styles.tableDatas}>
              <div className={styles.tableDatas_columnContainer}>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    n<sup></sup>
                  </div>
                  {getDatas.datasContainer.Secant &&
                    getDatas.datasContainer.Secant.batasAtas.map(
                      (data, index) => (
                        <div className={styles.tableDatas_Contents} key={index}>
                          {index + 1}
                        </div>
                      )
                    )}
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
                  getDatas.datasContainer.Secant.batasAtas.push("DummyData");
                  getDatas.datasContainer.Secant.batasBawah.push("DummyData");
                  // router.replace(router.asPath);
                  setEditX(getDatas.datasContainer.Secant.batasAtas.length - 1);
                  setEditY(
                    getDatas.datasContainer.Secant.batasBawah.length - 1
                  );
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
            <div className={styles.akarPersamaan_results}>
              <div
                className={styles.akarPersamaan_Input}
                onClick={() => {
                  setAkarPrsmnWindow(true);
                }}
              >
                <div className={styles.pangkatFormula}>
                  <div>x</div>
                  <h6>3</h6>
                </div>
                <span>+</span>
                <div className={styles.pangkatFormula}>
                  <div>x</div>
                  <h6>2</h6>
                </div>
                <span>-</span>
                <div>2</div>
                <span>*</span>
                <div>x</div>
                <span>-</span>
                <div>2</div>
              </div>
              <div className={styles.loopResults_Container}>
                <div className={styles.totalLoops_Container}>
                  <div className={styles.loopResults_label}>Total Iterasi:</div>
                  <div className={styles.loopResults_total}>{totalIterasi}</div>
                </div>
                <div className={styles.calculation}>
                  <div className={styles.calculation_label}>
                    Hasil Kalkulasi:
                  </div>
                  <div className={styles.calculation_Result}>{akarTarget}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {getAkarPrsmnWindow !== false && <AkarPrsmnWindow />}
      <Script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js" />
    </>
  );
}

export default SecantWindow;
