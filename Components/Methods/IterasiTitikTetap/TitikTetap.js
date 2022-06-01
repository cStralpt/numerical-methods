import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "/styles/InterPolyLenier.module.css";
import BiseksiStyles from "../../../styles/Biseksi.module.css";
import LineChart from "../../LineChart";
import { IntegerState } from "../../IntegerGlobalState";
import { DatasState } from "../../DatasContainer";
import { AppPathState } from "../../AppPath";
import Script from "next/script";
import { akarPersamaanState } from "../../AkarPrsmnState";
import DeleteDummyDatas from "../../MikroCMPs/DeleteDummyDatas";
import AkarPrsmnWindow from "../../MikroCMPs/AkarPrsmnWindow";
// import styles from "../../styles/Home.module.css";

function TitikTetapWindow() {
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

  const BeginTitikTetap = (batasAtas, eRA) => {
    if (tableResults.akar) {
      tableResults.akar = [];
      tableResults.convergen = [];
      tableResults.iterasi = [];
    }
    const perPangkatan = (nilai, pangkat) => {
      let hasilnya = nilai;
      for (let n = 1; n < pangkat; n++) {
        hasilnya = hasilnya * nilai;
      }
      //   console.log(hasilnya);
      return hasilnya;
    };
    const fX = (x) => {
      return perPangkatan(x, 2) - 2 * x - 3;
    };
    let loopLimits = 0;
    let btsAtas = batasAtas;
    let btsBwh;
    let errorRelatif = 1;
    const proses = [
      {
        procedure: (data) => {
          return Math.sqrt(2 * data + 3);
        },
      },
      {
        procedure: (data) => {
          return 3 / (data - 2);
        },
      },
      {
        procedure: (data) => {
          return (perPangkatan(data, 2) - 3) / 2;
        },
      },
    ];

    proses.map((data) => {
      while (errorRelatif > eRA) {
        btsBwh = data.procedure(btsAtas);
        errorRelatif = Math.abs((btsBwh - btsAtas) / btsBwh);
        btsAtas = btsBwh;
        // console.log(btsBwh);
        if (loopLimits == getLoopLimits) {
          break;
        }
        loopLimits++;
      }
      if (
        fX(
          btsBwh < 0
            ? btsBwh.toString().split(".")[0].split("")[0] +
                "" +
                Math.round(btsBwh.toString().split("-")[1])
            : btsBwh.toString().split(".")[0].split("")[0]
        ) == 0
      ) {
        if (btsBwh < 0) {
          tableResults.akar.push(
            btsBwh.toString().split(".")[0].split("")[0] +
              "" +
              Math.round(btsBwh.toString().split("-")[1])
          );
          tableResults.convergen.push(true);
          tableResults.iterasi.push(loopLimits);
        } else {
          tableResults.akar.push(Math.round(btsBwh));
          tableResults.convergen.push(true);
          tableResults.iterasi.push(loopLimits);
        }
      } else {
        tableResults.akar.push(btsBwh);
        tableResults.convergen.push(false);
        tableResults.iterasi.push(loopLimits);
      }
      setTotalIterasi(totalIterasi + loopLimits);
      loopLimits = 0;
      errorRelatif = 1;
      btsAtas = batasAtas;
    });
    tableResults.iterasi.sort((a, b) => {
      if (a - b < 0) {
        label.push(tableResults.iterasi.indexOf(a));
      } else if (a - b > 0) {
        label.push(tableResults.iterasi.indexOf(b));
      }
    });
    setGraphDatas({
      labels: [
        tableResults.akar[label[0]],
        tableResults.akar[label[1]],
        tableResults.akar.find((data) => {
          return (
            data != tableResults.akar[label[0]] && tableResults.akar[label[1]]
          );
        }),
      ],
      datasets: [
        {
          label: "Iterasi Titk Tetap",
          lineTension: 0.4,
          radius: 5,
          data: [
            tableResults.iterasi[label[0]],
            tableResults.iterasi[label[1]],
            tableResults.iterasi.find((data) => {
              return (
                data != tableResults.iterasi[label[0]] &&
                tableResults.iterasi[label[1]]
              );
            }),
          ],
        },
      ],
    });
  };
  const FormEditData = ({ depsData }) => {
    if (depsData === "x") {
      return (
        getDatas.datasContainer.IterasiTitikTetap &&
        getDatas.datasContainer.IterasiTitikTetap.batasAtas.map(
          (data, index) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!!e.target.inputNilai.value) {
                  if (
                    getDatas.datasContainer.IterasiTitikTetap.batasAtas[
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
                        (data) => data == "DummyData"
                      )
                    ] === "DummyData"
                  ) {
                    getDatas.datasContainer.IterasiTitikTetap.batasAtas.fill(
                      xDataValues,
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
                        (data) => data == "DummyData"
                      ),
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
                        (data) => data == "DummyData"
                      ) + 1
                    );
                    setEditX([]);
                  }

                  getDatas.datasContainer.IterasiTitikTetap.batasAtas.fill(
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
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas[index]
                    );
                    setEditX(index);
                    if (
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas[
                        getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
                          (data) => data == "DummyData"
                        )
                      ] === "DummyData"
                    ) {
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas.splice(
                        getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
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
        getDatas.datasContainer.IterasiTitikTetap &&
        getDatas.datasContainer.IterasiTitikTetap.batasBawah.map(
          (data, index) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!!e.target.inputNilai.value) {
                  // getDatas.datasContainer.interpol.lenier[editYvalue.index].y = editYvalue.value;
                  cariAkar(
                    getDatas.datasContainer.IterasiTitikTetap.batasBawah[0],
                    getDatas.datasContainer.IterasiTitikTetap.batasBawah[0]
                  );
                  if (
                    getDatas.datasContainer.IterasiTitikTetap.batasBawah[
                      getDatas.datasContainer.IterasiTitikTetap.batasBawah.findIndex(
                        (data) => data == "DummyData"
                      )
                    ] === "DummyData"
                  ) {
                    getDatas.datasContainer.IterasiTitikTetap.batasBawah.fill(
                      yDataValues,
                      getDatas.datasContainer.IterasiTitikTetap.batasBawah.findIndex(
                        (data) => data == "DummyData"
                      ),
                      getDatas.datasContainer.IterasiTitikTetap.batasBawah.findIndex(
                        (data) => data == "DummyData"
                      ) + 1
                    );
                    setEditY([]);
                  } else if (
                    getDatas.datasContainer.IterasiTitikTetap.batasBawah[
                      editY
                    ] !== "DummyData"
                  ) {
                    getDatas.datasContainer.IterasiTitikTetap.batasBawah.fill(
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
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas[index]
                    );
                    setYDataValues(
                      getDatas.datasContainer.IterasiTitikTetap.batasBawah[
                        index
                      ]
                    );
                    setEditX([]);
                    setEditY(index);
                    if (
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas[
                        getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
                          (data) => data == "DummyData"
                        )
                      ] === "DummyData" &&
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas[
                        getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
                          (data) => data == "DummyData"
                        )
                      ] === "DummyData"
                    ) {
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas.splice(
                        getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
                          (data) => data == "DummyData"
                        ),
                        1
                      );
                      getDatas.datasContainer.IterasiTitikTetap.batasBawah.splice(
                        getDatas.datasContainer.IterasiTitikTetap.batasBawah.findIndex(
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
          )
        )
      );
    } else if (depsData === "deleteBtn") {
      return (
        getDatas.datasContainer.IterasiTitikTetap &&
        getDatas.datasContainer.IterasiTitikTetap.batasAtas.map(
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
                        getDatas.datasContainer.IterasiTitikTetap.batasAtas[
                          getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
                            (data) => data == "DummyData"
                          )
                        ] == "DummyData"
                      ) {
                        getDatas.datasContainer.IterasiTitikTetap.batasAtas.splice(
                          getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
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
              {getDatas.datasContainer.IterasiTitikTetap.batasAtas[
                getDatas.datasContainer.IterasiTitikTetap.batasAtas.findIndex(
                  (data) => data == "DummyData"
                )
              ] !== "DummyData" && (
                // update
                <>
                  <i
                    className="bx bx-trash bx-tada-hover"
                    onClick={() => {
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas.splice(
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
                        getDatas.datasContainer.IterasiTitikTetap.batasAtas[
                          index
                        ]
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
  const cariAkar = (batasAtas) => {
    if (!!getDatas.datasContainer.IterasiTitikTetap.batasAtas[0]) {
      let akarTrgt = BeginTitikTetap(batasAtas, toleransiE);
      setAkaraTarget(akarTrgt);
    }
  };
  console.log(
    getDatas.methods.find((datas) => datas.slug == "iterasi-titik-tetap")
      .methodId
  );
  return (
    <>
      <div className={styles.ioExecution_sheet}>
        <div className={styles.userInput}>
          {/* Update */}
          <div className={BiseksiStyles.loopLimits_toleransiError}>
            <div className={BiseksiStyles.loopLimits_Container}>
              <label
                className={BiseksiStyles.loopLimits_label}
                for="loopLimits"
              >
                Loop Limits
              </label>
              <input
                className={BiseksiStyles.loopLimits_input}
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
            <div className={BiseksiStyles.sumbuContainer}>
              <div className={styles.findXContainer}>
                <input
                  className={styles.findX_input}
                  type="number"
                  autoFocus
                  placeholder="Toleransi (eRA)"
                  onChange={(e) => {
                    setToleransiE(e.target.value);
                    cariAkar(
                      getDatas.datasContainer.IterasiTitikTetap.batasAtas[0],
                      getDatas.datasContainer.IterasiTitikTetap.batasBawah[0]
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
                  {getDatas.datasContainer.IterasiTitikTetap &&
                    getDatas.datasContainer.IterasiTitikTetap.batasAtas.map(
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
                    <sup className={styles.actionHeading}>Y</sup>
                  </div>
                  <FormEditData depsData="deleteBtn" />
                </div>
              </div>
              <div
                className={styles.entryNewData}
                onClick={() => {
                  getDatas.datasContainer.IterasiTitikTetap.batasAtas.push(
                    "DummyData"
                  );
                  // router.replace(router.asPath);
                  setEditX(
                    getDatas.datasContainer.IterasiTitikTetap.batasAtas.length -
                      1
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
                  <h6>2</h6>
                </div>
                <span>-</span>
                <div>2</div>
                <span>*</span>
                <div>x</div>
                <span>-</span>
                <div>3</div>
              </div>
              <div className={styles.loopResults_Container}>
                <div className={styles.totalLoops_Container}>
                  <div className={styles.loopResults_label}>Total Iterasi:</div>
                  <div className={styles.loopResults_total}>{totalIterasi}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.prosesReults}>
            <div className={styles.prosessResults_Graph}>
              <div className={styles.prosessResults_graphheading}>Graph</div>
              <div className={styles.prosessResults_graphResult}>
                {/* <HighchartsReact
                highcharts={Highcharts}
                options={options}
              ></HighchartsReact> */}
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
                          <div className={styles.tableDatas_Contents}>
                            {index + 1}
                          </div>
                        );
                      })}
                  </div>
                  <div className={styles.tableDatas_column}>
                    <div className={styles.tableDatas_heading}>Akar</div>
                    {!!tableResults.akar &&
                      tableResults.akar.map((data) => {
                        return (
                          <div className={styles.tableDatas_Contents}>
                            {data}
                          </div>
                        );
                      })}
                  </div>
                  <div className={styles.tableDatas_column}>
                    <div className={styles.tableDatas_heading}>Iterasi</div>
                    {!!tableResults.iterasi &&
                      tableResults.iterasi.map((data) => {
                        return (
                          <div className={styles.tableDatas_Contents}>
                            {data}
                          </div>
                        );
                      })}
                  </div>
                  <div className={styles.tableDatas_column}>
                    <div className={styles.tableDatas_heading}>fX(n)=0</div>
                    {!!tableResults.convergen &&
                      tableResults.convergen.map((data) => {
                        return (
                          <div className={styles.tableDatas_Contents}>
                            {`${data}`}
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
      {getAkarPrsmnWindow !== false && <AkarPrsmnWindow />}
      <Script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js" />
    </>
  );
}

export default TitikTetapWindow;
