import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "/styles/InterPolyLenier.module.css";
import BijeksiStyles from "../../../styles/Bijeksi.module.css";
import LineChart from "../../LineChart";
import { IntegerState } from "../../IntegerGlobalState";
import { DatasState } from "../../DatasContainer";
import { AppPathState } from "../../AppPath";
import Script from "next/script";
import { akarPersamaanState } from "../../AkarPrsmnState";
import DeleteDummyDatas from "../../MikroCMPs/DeleteDummyDatas";
import AkarPrsmnWindow from "../../MikroCMPs/AkarPrsmnWindow";
// import styles from "../../styles/Home.module.css";

function EliminasiGauss() {
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
  const [akarTarget, setAkarTarget] = useState();
  const [toleransiE, setToleransiE] = useState(0.000001);
  const [isDataChecked, setCheckedData] = useState();
  const [getLoopLimits, setLoopLimits] = useState(1000);
  const [totalIterasi, setTotalIterasi] = useState(0);
  const [getAkarPrsmnWindow, setAkarPrsmnWindow] =
    useContext(akarPersamaanState);
  const [label] = useState([]);
  const [tableResults] = useState({
    akar: [],
    convergen: [],
    iterasi: [],
  });
  const router = useRouter();
  DeleteDummyDatas();
  // Graph
  const [graphDatas, setGraphDatas] = useState({
    labels: [
      tableResults?.akar[0],
      tableResults?.akar[1],
      tableResults?.akar[2],
    ],
    datasets: [
      {
        label: "Iterasi Titik Tetap",
        lineTension: 0.4,
        radius: 5,
        data: [
          tableResults?.iterasi[0],
          tableResults?.iterasi[1],
          tableResults?.iterasi[2],
        ],
      },
    ],
  });

  const BeginEliminasiGauss = (variabkePersamaan, eRA) => {
    let matrikEselon = [];
    let b2KeNol = [];
    let b2K2_ke1 = [];
    let b2b3_keNol = [];
    let b3k2_keNol = [];
    let b3k3_keNol = [];
    let index = 0;
    const ubahB2KeNol = (b1, b2) => {
      b2KeNol.push(
        -getDatas.datasContainer.EliminasiGauss.variabkePersamaan[1][0] * b1 +
          b2
      );
    };
    const ubahB2K2_keAngka1 = (k2) => {
      b2K2_ke1.push((k2 * 1) / matrikEselon[1][1]);
    };
    const ubahB3KeNol = (b1, b3) => {
      b2b3_keNol.push(-matrikEselon[2][0] * b1 + b3);
    };
    const ubahB3K2KeNol = (b2, b3) => {
      b3k2_keNol.push(-matrikEselon[2][1] * b2 + b3);
    };
    const ubahB3K3KeNol = (b3) => {
      if (b3 != 0) {
        b3k3_keNol.push((b3 * 1) / matrikEselon[2][2]);
      } else {
        b3k3_keNol.push(b3);
      }
    };
    let convertToMatrikEselonBaris = () => {
      // Ubah Baris Ke 2 Ke Nol
      if (
        -Math.abs(
          getDatas.datasContainer.EliminasiGauss.variabkePersamaan[1][0]
        ) *
          getDatas.datasContainer.EliminasiGauss.variabkePersamaan[0][0] +
          getDatas.datasContainer.EliminasiGauss.variabkePersamaan[1][0] ==
        0
      ) {
        console.log({ t: true });
        // if (!formula[0]) {
          matrikEselon.push(
            getDatas.datasContainer.EliminasiGauss.variabkePersamaan[0]
          );
        // }
        getDatas.datasContainer.EliminasiGauss.variabkePersamaan[0].map(
          (data) => {
            ubahB2KeNol(
              data,
              getDatas.datasContainer.EliminasiGauss.variabkePersamaan[1][index]
            );
            index++;
          }
        );
        matrikEselon.push(b2KeNol);
        matrikEselon.push(
          getDatas.datasContainer.EliminasiGauss.variabkePersamaan[2]
        );
        index = 0;
        // End B2keNol

        matrikEselon[1].map((data) => {
          ubahB2K2_keAngka1(data);
          index++;
        });
        matrikEselon.fill(b2K2_ke1, 1, 2);
        index = 0;
        matrikEselon[2].map((data) => {
          ubahB3KeNol(matrikEselon[0][index], data);
          index++;
        });
        matrikEselon.fill(b2b3_keNol, 2, 3);
        index = 0;
        matrikEselon[2].map((data) => {
          ubahB3K2KeNol(matrikEselon[1][index], data);
          index++;
        });
        matrikEselon.fill(b3k2_keNol, 2, 3);
        index = 0;
        matrikEselon[2].map((data) => {
          ubahB3K3KeNol(data);
          index++;
        });
        matrikEselon.fill(b3k3_keNol, 2, 3);

        console.log(matrikEselon);
        console.log(b3k3_keNol);
      }
    };
    convertToMatrikEselonBaris();
    const substitusiMundur = () => {
      console.log(datasContainer.datasContainer.EliminasiGauss);
    };
    console.log(
      -Math.abs(
        getDatas.datasContainer.EliminasiGauss.variabkePersamaan[1][0]
      ) + 3
    );
  };
  BeginEliminasiGauss();
  const FormEditData = ({ depsData }) => {
    if (depsData === "x") {
      return (
        getDatas.datasContainer.EliminasiGauss &&
        getDatas.datasContainer.EliminasiGauss.variabkePersamaan.map(
          (data, index) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!!e.target.inputNilai.value) {
                  if (
                    getDatas.datasContainer.EliminasiGauss.variabkePersamaan[
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
                        (data) => data == "DummyData"
                      )
                    ] === "DummyData"
                  ) {
                    getDatas.datasContainer.EliminasiGauss.variabkePersamaan.fill(
                      xDataValues,
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
                        (data) => data == "DummyData"
                      ),
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
                        (data) => data == "DummyData"
                      ) + 1
                    );
                    setEditX([]);
                  }
                  getDatas.datasContainer.EliminasiGauss.variabkePersamaan.fill(
                    e.target.inputNilai.value,
                    index,
                    index + 1
                  );
                  setEditX([]);
                }
              }}
              key={index}
            >
              <div
                className={styles.tableDatas_Contents}
                onClick={(e) => {
                  if (e.detail === 2) {
                    setXDataValues(
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan[
                        index
                      ]
                    );
                    setEditX(index);
                    if (
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan[
                        getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
                          (data) => data == "DummyData"
                        )
                      ] === "DummyData"
                    ) {
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan.splice(
                        getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
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
          )
        )
      );
    } else if (depsData === "y") {
      return (
        getDatas.datasContainer.EliminasiGauss &&
        getDatas.datasContainer.EliminasiGauss.batasBawah.map((data, index) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!!e.target.inputNilai.value) {
                // getDatas.datasContainer.interpol.lenier[editYvalue.index].y = editYvalue.value;
                cariAkar(
                  getDatas.datasContainer.EliminasiGauss.batasBawah[0],
                  getDatas.datasContainer.EliminasiGauss.batasBawah[0]
                );
                if (
                  getDatas.datasContainer.EliminasiGauss.batasBawah[
                    getDatas.datasContainer.EliminasiGauss.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    )
                  ] === "DummyData"
                ) {
                  getDatas.datasContainer.EliminasiGauss.batasBawah.fill(
                    yDataValues,
                    getDatas.datasContainer.EliminasiGauss.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    ),
                    getDatas.datasContainer.EliminasiGauss.batasBawah.findIndex(
                      (data) => data == "DummyData"
                    ) + 1
                  );
                  setEditY([]);
                } else if (
                  getDatas.datasContainer.EliminasiGauss.batasBawah[editY] !==
                  "DummyData"
                ) {
                  getDatas.datasContainer.EliminasiGauss.batasBawah.fill(
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
                    getDatas.datasContainer.EliminasiGauss.variabkePersamaan[
                      index
                    ]
                  );
                  setYDataValues(
                    getDatas.datasContainer.EliminasiGauss.batasBawah[index]
                  );
                  setEditX([]);
                  setEditY(index);
                  if (
                    getDatas.datasContainer.EliminasiGauss.variabkePersamaan[
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
                        (data) => data == "DummyData"
                      )
                    ] === "DummyData" &&
                    getDatas.datasContainer.EliminasiGauss.variabkePersamaan[
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
                        (data) => data == "DummyData"
                      )
                    ] === "DummyData"
                  ) {
                    getDatas.datasContainer.EliminasiGauss.variabkePersamaan.splice(
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
                        (data) => data == "DummyData"
                      ),
                      1
                    );
                    getDatas.datasContainer.EliminasiGauss.batasBawah.splice(
                      getDatas.datasContainer.EliminasiGauss.batasBawah.findIndex(
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
        getDatas.datasContainer.EliminasiGauss &&
        getDatas.datasContainer.EliminasiGauss.variabkePersamaan.map(
          (data, index) => (
            <div className={styles.tableDatas_Icon} key={index}>
              {(editX === index || editY === index) && (
                <>
                  <box-icon
                    name="x-circle"
                    color="#e78ea9"
                    animation="tada-hover"
                    onClick={() => {
                      if (
                        getDatas.datasContainer.EliminasiGauss
                          .variabkePersamaan[
                          getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
                            (data) => data == "DummyData"
                          )
                        ] == "DummyData"
                      ) {
                        getDatas.datasContainer.EliminasiGauss.variabkePersamaan.splice(
                          getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
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
              {getDatas.datasContainer.EliminasiGauss.variabkePersamaan[
                getDatas.datasContainer.EliminasiGauss.variabkePersamaan.findIndex(
                  (data) => data == "DummyData"
                )
              ] !== "DummyData" && (
                // update
                <>
                  <i
                    className="bx bx-trash bx-tada-hover"
                    onClick={() => {
                      getDatas.datasContainer.EliminasiGauss.variabkePersamaan.splice(
                        index,
                        1
                      );
                      router.replace(router.asPath);
                      setEditX([]);
                      setEditY([]);
                    }}
                  ></i>
                  <div
                    className={styles.checkBoxContainer}
                    onClick={() => {
                      cariAkar(
                        getDatas.datasContainer.EliminasiGauss
                          .variabkePersamaan[index]
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
          )
        )
      );
    }
  };
  const cariAkar = (variabkePersamaan) => {
    if (!!getDatas.datasContainer.EliminasiGauss.variabkePersamaan[0]) {
      let akarTrgt = BeginEliminasiGauss(variabkePersamaan, toleransiE);
      setAkarTarget(akarTrgt);
    }
  };
  return (
    <>
      <div className={styles.ioExecution_sheet}>
        {getAkarPrsmnWindow !== false && <AkarPrsmnWindow />}
        <div className={styles.userInput}>
          {/* Update */}
          <div className={BijeksiStyles.loopLimits_toleransiError}>
            <div className={BijeksiStyles.loopLimits_Container}>
              <label
                className={BijeksiStyles.loopLimits_label}
                htmlFor="loopLimits"
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
                    if (
                      !!getDatas.datasContainer.EliminasiGauss
                        .variabkePersamaan[0]
                    ) {
                      cariAkar(
                        getDatas.datasContainer.EliminasiGauss
                          .variabkePersamaan[0]
                      );
                      setCheckedData();
                    }
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
                  <div className={styles.tableDatas_heading}>n</div>
                  <div className={styles.tableDatas_Contents}>1</div>
                  <div className={styles.tableDatas_Contents}>2</div>
                  <div className={styles.tableDatas_Contents}>3</div>
                </div>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    Akar Persamaan
                  </div>

                  <div className={styles.tableDatas_Contents}>
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        fontWeight: 700,
                        color: "#e78ea9",
                        justifyContent: "center",
                      }}
                    >
                      <div>x</div>
                      <span>-</span>
                      <div>2y</div>
                      <span>+</span>
                      <div>z</div>
                      <span>=</span>
                      <div>6</div>
                    </div>
                  </div>
                  <div className={styles.tableDatas_Contents}>
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        fontWeight: 700,
                        color: "#e78ea9",
                        justifyContent: "center",
                      }}
                    >
                      <div>3x</div>
                      <span>+</span>
                      <div>y</div>
                      <span>-</span>
                      <div>2z</div>
                      <div>=4</div>
                    </div>
                  </div>
                  <div className={styles.tableDatas_Contents}>
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        fontWeight: 700,
                        color: "#e78ea9",
                        justifyContent: "center",
                      }}
                    >
                      <div>7x</div>
                      <span>-</span>
                      <div>6y</div>
                      <span>-</span>
                      <div>z=10</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={styles.entryNewData}
                onClick={() => {
                  setAkarPrsmnWindow(true);
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
          <div className={styles.prosesReults}>
            <div className={styles.prosessResults_Graph}>
              <div className={styles.prosessResults_graphheading}>Graph</div>
              <div className={styles.prosessResults_graphResult}>
                <LineChart datas={graphDatas} />
              </div>
            </div>
            <div className={styles.prosessResults_tableResult}>
              <div className={styles.prosessResults_Heading}>Result</div>
              <div className={styles.tableDatas}>
                <div className={styles.tableDatas_columnContainer}>
                  <div className={styles.tableDatas_column}>
                    <div className={styles.tableDatas_heading}>n</div>
                    {!!tableResults.akar &&
                      tableResults.akar.map((data, index) => {
                        return (
                          <div className={styles.tableDatas_Contents} key={index}>
                            {index + 1}
                          </div>
                        );
                      })}
                  </div>
                  <div className={styles.tableDatas_column}>
                    <div className={styles.tableDatas_heading}>Akar</div>
                    {!!tableResults.akar &&
                      tableResults.akar.map((data,index) => {
                        return (
                          <div className={styles.tableDatas_Contents} key={index}>
                            {data}
                          </div>
                        );
                      })}
                  </div>
                  <div className={styles.tableDatas_column}>
                    <div className={styles.tableDatas_heading}>Iterasi</div>
                    {!!tableResults.iterasi &&
                      tableResults.iterasi.map((data,index) => {
                        return (
                          <div className={styles.tableDatas_Contents} key={index}>
                            {data}
                          </div>
                        );
                      })}
                  </div>
                  <div className={styles.tableDatas_column}>
                    <div className={styles.tableDatas_heading}>fX(n)=0</div>
                    {!!tableResults.convergen &&
                      tableResults.convergen.map((data,index) => {
                        return (
                          <div className={styles.tableDatas_Contents} key={index}>
                            {data ? (
                              <div className={styles.isConvergen}>
                                <i
                                  className="bx bx-check"
                                  customTitle={data ? "Konvergen" : "Divergen"}
                                ></i>
                              </div>
                            ) : (
                              <div className={styles.isConvergen}>
                                <i
                                  customTitle={data ? "Konvergen" : "Divergen"}
                                  className="bx bx-x"
                                ></i>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js" />
    </>
  );
}

export default EliminasiGauss;
