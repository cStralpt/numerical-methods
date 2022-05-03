import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/InterPolyLenier.module.css";
import LineChart from "../LineChart";
import { IntegerState } from "../IntegerGlobalState";
import { DatasState } from "../DatasContainer";
import { AppPathState } from "../AppPath";
// import styles from "../../styles/Home.module.css";

function Lenier() {
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
  // const [getDatas.interpol.lenier, setgetDatas.interpol.lenier] = useState(getDatas.interpol.lenier);
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
  getDatas.interpol.lenier.sort((a, b) => a.x + b.x);
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
  const FormEditData = ({ depsData }) => {
    if (depsData === "x") {
      return (
        getDatas.interpol.lenier &&
        getDatas.interpol.lenier.map((data, index) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!!e.target.inputNilai.value) {
                if (
                  getDatas.interpol.lenier[getDatas.interpol.lenier.length - 1]
                    .y === "DummyData"
                ) {
                  alert("isi sumbu Y dulu");
                } else if (
                  getDatas.interpol.lenier[getDatas.interpol.lenier.length - 1]
                    .y !== "DummyData"
                ) {
                  getDatas.interpol.lenier[editXvalue.index].x =
                    editXvalue.value;
                  setEditX([]);
                }
              }
            }}
            key={index}
          >
            <div
              className={styles.tableDatas_Contents}
              onClick={(e) => {
                if (e.detail === 2) {
                  setXDataValues(getDatas.interpol.lenier[index].x);
                  setEditX(index);
                  setEditY([]);
                }
              }}
            >
              {data.x}
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
        getDatas.interpol.lenier &&
        getDatas.interpol.lenier.map((data, index) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!!e.target.inputNilai.value) {
                getDatas.interpol.lenier[editYvalue.index].y = editYvalue.value;
                setEditY([]);
              }
            }}
            key={index}
          >
            <div
              className={styles.tableDatas_Contents}
              onClick={(e) => {
                if (e.detail === 2) {
                  setYDataValues(getDatas.interpol.lenier[index].y);
                  setEditX([]);
                  setEditY(index);
                }
              }}
            >
              {data.y}
            </div>
            {editY === index && (
              <input
                type="number"
                autoFocus
                name="inputNilai"
                onChange={(e) => {
                  setYDataValues(parseInt(e.target.value));
                  setEditYvalue({
                    value: parseInt(e.target.value),
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
        getDatas.interpol.lenier &&
        getDatas.interpol.lenier.map((data, index) => (
          <div className={styles.tableDatas_Icon} key={index}>
            {(editX === index || editY === index) && (
              <box-icon
                name="x-circle"
                color="#e78ea9"
                animation="tada-hover"
                onClick={() => {
                  if (
                    getDatas.interpol.lenier[
                      getDatas.interpol.lenier.length - 1
                    ].x === "DummyData" ||
                    getDatas.interpol.lenier[
                      getDatas.interpol.lenier.length - 1
                    ].y === "DummyData"
                  ) {
                    getDatas.interpol.lenier.splice(
                      getDatas.interpol.lenier.length - 1,
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
            {getDatas.interpol.lenier[index].x !== "DummyData" && (
              <box-icon
                name="trash"
                color="#e78ea9"
                animation="tada-hover"
                onClick={() => {
                  getDatas.interpol.lenier.splice(index, 1);
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

  const cariTtkTrdkt = (cariX) => {
    if (cariX > getDatas.interpol.lenier.sort((a, b) => a.x - b.x)[0].x)
      setMncariTitikTrdkt({
        titikPertama: {
          x: getDatas.interpol.lenier
            .sort((a, b) => a.x - b.x)
            .filter((data) => data.x < cariX)[
            getDatas.interpol.lenier
              .sort((a, b) => a.x - b.x)
              .filter((data) => data.x < cariX).length - 1
          ]?.x,
          y: getDatas.interpol.lenier
            .sort((a, b) => a.x - b.x)
            .filter((data) => data.x < cariX)[
            getDatas.interpol.lenier
              .sort((a, b) => a.x - b.x)
              .filter((data) => data.x < cariX).length - 1
          ]?.y,
        },
        titikKedua: {
          x: getDatas.interpol.lenier
            .sort((a, b) => a.x - b.x)
            .filter((data) => data.x > cariX)[0]?.x,
          y: getDatas.interpol.lenier
            .sort((a, b) => a.x - b.x)
            .filter((data) => data.x > cariX)[
            getDatas.interpol.lenier
              .sort((a, b) => a.x - b.x)
              .filter((data) => data.x > cariX).length - 1
          ]?.y,
        },
      });
  };
  const clearValues = (e) => {
    if (
      e >= getDatas.interpol.lenier.sort((a, b) => a.x - b.x)[0].x &&
      e <=
        getDatas.interpol.lenier.sort((a, b) => a.x - b.x)[
          getDatas.interpol.lenier.length - 1
        ].x &&
      getDatas.interpol.lenier.map((data) => data.x).includes(parseInt(e))
    ) {
      setTtkTarget([]);
    } else if (
      e >
      getDatas.interpol.lenier.sort((a, b) => a.x - b.x)[
        getDatas.interpol.lenier.length - 1
      ].x
    ) {
      setTtkTarget([]);
    }
  };
  {
    console.log(router.query);
  }
  return (
    <>
      <Head>
        <script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js"></script>
      </Head>
      <div className={styles.ioExecution_sheet}>
        <div className={styles.userInput}>
          <div className={styles.findXContainer}>
            <input
              className={styles.findX_input}
              type="number"
              autoFocus
              placeholder="masukan titik yang di cari(X)"
              onChange={(e) => {
                if (
                  !!getDatas.interpol.lenier[0] &&
                  getDatas.interpol.lenier[0].x !== "DummyData"
                ) {
                  setTtkTarget();
                  if (
                    e.target.value >
                      getDatas.interpol.lenier.sort((a, b) => a.x - b.x)[0].x &&
                    e.target.value <
                      getDatas.interpol.lenier.sort((a, b) => a.x - b.x)[
                        getDatas.interpol.lenier.sort((a, b) => a.x - b.x)
                          .length - 1
                      ].x &&
                    getDatas.interpol.lenier
                      .map((data) => data.x)
                      .includes(parseFloat(e.target.value)) == false
                  ) {
                    cariTtkTrdkt(e.target.value);
                    setXygDicari(e.target.value);
                  }
                  if (
                    e.target.value >=
                    getDatas.interpol.lenier.sort((a, b) => a.x - b.x)[
                      getDatas.interpol.lenier.length - 1
                    ].x
                  ) {
                    setTtkTarget([]);
                  }
                }
              }}
              onFocus={() => {
                setEditX([]);
                setEditY([]);

                if (
                  !!getDatas.interpol.lenier[0] &&
                  getDatas.interpol.lenier[0].x !== "DummyData"
                ) {
                  if (
                    getDatas.interpol.lenier[
                      getDatas.interpol.lenier.length - 1
                    ].y === "DummyData" ||
                    getDatas.interpol.lenier[
                      getDatas.interpol.lenier.length - 1
                    ].x === "DummyData"
                  ) {
                    getDatas.interpol.lenier.splice(
                      getDatas.interpol.lenier.length - 1,
                      1
                    );
                  }
                }
              }}
              value={ttkTarget}
            />
            {console.log(
              getDatas.interpol.lenier.map((data) => data.x).includes(2016)
            )}
          </div>
          <div className={styles.tableDatasContainer}>
            <div className={styles.tableDatas}>
              <div className={styles.tableDatas_columnContainer}>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    n<sup></sup>
                  </div>
                  {getDatas.interpol.lenier &&
                    getDatas.interpol.lenier.map((data, index) => (
                      <div className={styles.tableDatas_Contents} key={index}>
                        {index + 1}
                      </div>
                    ))}
                </div>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    <sup>X</sup>n
                  </div>
                  {<FormEditData depsData="x" />}
                </div>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    <sup>Y</sup>n
                  </div>
                  {<FormEditData depsData="y" />}
                </div>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    <sup>Y</sup>
                  </div>
                  {<FormEditData depsData="deleteBtn" />}
                </div>
              </div>
              <div
                className={styles.entryNewData}
                onClick={() => {
                  getDatas.interpol.lenier.push({
                    x: "DummyData",
                    y: "DummyData",
                  });
                  // router.replace(router.asPath);
                  setEditX(getDatas.interpol.lenier.length - 1);
                  setEditY(getDatas.interpol.lenier.length - 1);
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
              <LineChart datas={graphDatas} />
            </div>
          </div>
          <div className={styles.prosessResults_tableResult}>
            <div className={styles.prosessResults_Heading}>Result</div>
            <div className={styles.tableDatas}>
              <div className={styles.tableDatas_columnContainer}>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    n<sup></sup>
                  </div>
                  {mncariTitiktrdkt &&
                    [
                      mncariTitiktrdkt?.titikPertama.x,
                      parseInt(xYgDicari),
                      mncariTitiktrdkt?.titikKedua.x,
                    ].map((data, index) => (
                      <div className={styles.tableDatas_Contents}>
                        {index + 1}
                      </div>
                    ))}
                </div>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    <sup>X</sup>n
                  </div>
                  {mncariTitiktrdkt &&
                    [
                      mncariTitiktrdkt.titikPertama.x,
                      xYgDicari,
                      mncariTitiktrdkt.titikKedua.x,
                    ].map((data, index) => (
                      <div className={styles.tableDatas_Contents} key={index}>
                        {data}
                        {/* {setCountR(+1)} */}
                      </div>
                    ))}
                </div>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    <sup>Y</sup>n
                  </div>

                  {mncariTitiktrdkt &&
                    [
                      mncariTitiktrdkt.titikPertama.y,
                      Math.round(
                        mncariTitiktrdkt?.titikPertama.y +
                          ((mncariTitiktrdkt?.titikKedua.y -
                            mncariTitiktrdkt?.titikPertama.y) /
                            (mncariTitiktrdkt?.titikKedua.x -
                              mncariTitiktrdkt?.titikPertama.x)) *
                            (xYgDicari - mncariTitiktrdkt?.titikPertama.x)
                      ),
                      mncariTitiktrdkt.titikKedua.y,
                    ].map((data, index) => (
                      <div className={styles.tableDatas_Contents} key={index}>
                        {isInteger ? parseInt(data) : data}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lenier;
