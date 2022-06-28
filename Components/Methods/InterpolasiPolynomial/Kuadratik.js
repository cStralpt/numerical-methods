import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "/styles/InterPolyLenier.module.css";
import { IntegerState } from "../../IntegerGlobalState";
import LineChart from "../../LineChart";
import { DatasState } from "../../DatasContainer";
import { AppPathState } from "../../AppPath";
import Script from "next/script";
// import styles from "../../styles/Home.module.css";

function Kuadratik() {
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
  // const [getDatas.datasContainer.interpol.kuadratik, setgetDatas.datasContainer.interpol.kuadratik] = useState(getDatas.datasContainer.interpol.kuadratik);
  // console.log(mncariTitiktrdkt);
  let b0 = mncariTitiktrdkt?.titikPertama.y;
  let b1 =
    (mncariTitiktrdkt?.titikKedua.y - mncariTitiktrdkt?.titikPertama.y) /
    (mncariTitiktrdkt?.titikKedua.x - mncariTitiktrdkt?.titikPertama.x);
  let c1 =
    (mncariTitiktrdkt?.titikKetiga.y - mncariTitiktrdkt?.titikKedua.y) /
    (mncariTitiktrdkt?.titikKetiga.x - mncariTitiktrdkt?.titikKedua.x);
  let b2 =
    (c1 - b1) /
    (mncariTitiktrdkt?.titikKetiga.x - mncariTitiktrdkt?.titikPertama.x);
  const [graphDatas, setGraphDatas] = useState({
    labels: [
      mncariTitiktrdkt?.titikPertama.y,
      mncariTitiktrdkt?.titikPertama.y +
        ((mncariTitiktrdkt?.titikKedua.y - mncariTitiktrdkt?.titikPertama.y) /
          (mncariTitiktrdkt?.titikKedua.x - mncariTitiktrdkt?.titikPertama.x)) *
          (xYgDicari - mncariTitiktrdkt?.titikPertama.x) +
        xYgDicari *
          (xYgDicari - mncariTitiktrdkt?.titikPertama.x) *
          (xYgDicari - mncariTitiktrdkt?.titikKedua.x),
      mncariTitiktrdkt?.titikKedua.y,
      mncariTitiktrdkt?.titikKetiga.y,
    ],
    datasets: [
      {
        label: "Interpolasi Polynomial Kuadratik",
        lineTension: 0.4,
        radius: 5,
        color: "#ff7   ",
        data: [
          mncariTitiktrdkt?.titikPertama.x,
          xYgDicari,
          mncariTitiktrdkt?.titikKedua.x,
          mncariTitiktrdkt?.titikKetiga.x,
        ],
      },
    ],
  });
  getDatas.datasContainer.interpol.kuadratik.sort((a, b) => a.x + b.x);
  const router = useRouter();
  useEffect(() => {
    setGraphDatas({
      labels: [
        mncariTitiktrdkt?.titikPertama.x,
        mncariTitiktrdkt?.titikKedua.x,
        mncariTitiktrdkt?.titikKetiga.x,
      ],
      datasets: [
        {
          label: "Interpolasi Polynomial Kuadratik",
          lineTension: 0.4,
          radius: 5,
          data: [
            mncariTitiktrdkt?.titikPertama.y,
            mncariTitiktrdkt?.titikPertama.y +
              ((mncariTitiktrdkt?.titikKedua.y -
                mncariTitiktrdkt?.titikPertama.y) /
                (mncariTitiktrdkt?.titikKedua.x -
                  mncariTitiktrdkt?.titikPertama.x)) *
                (xYgDicari - mncariTitiktrdkt?.titikPertama.x) +
              xYgDicari *
                (xYgDicari - mncariTitiktrdkt?.titikPertama.x) *
                (xYgDicari - mncariTitiktrdkt?.titikKedua.x),
            mncariTitiktrdkt?.titikKedua.y,
            mncariTitiktrdkt?.titikKetiga.y,
          ],
        },
      ],
    });
    setAppPath("InterPolKuadratik");
  }, [xYgDicari]);
  {
    console.log(
      getDatas.datasContainer.interpol.kuadratik
        .map((d) => d.x === 1)
        .includes(true)
    );
  }
  const FormEditData = ({ depsData }) => {
    if (depsData === "x") {
      return (
        getDatas.datasContainer.interpol.kuadratik &&
        getDatas.datasContainer.interpol.kuadratik.map((data, index) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!!e.target.inputNilai.value) {
                if (
                  getDatas.datasContainer.interpol.kuadratik.find(
                    (d) => d.y === "DummyData"
                  )
                ) {
                  alert("isi sumbu Y dulu");
                } else if (
                  getDatas.datasContainer.interpol.kuadratik
                    .map((d) => d.x == e.target.inputNilai.value)
                    .includes(true)
                ) {
                  alert("Penumpukan Data!");
                } else if (
                  getDatas.datasContainer.interpol.kuadratik.find(
                    (d) => d.y !== "DummyData"
                  )
                ) {
                  getDatas.datasContainer.interpol.kuadratik[index].x =
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
                  setXDataValues(
                    getDatas.datasContainer.interpol.kuadratik[index].x
                  );
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
                required
                name="inputNilai"
                onChange={(e) => {
                  setXDataValues(e.target.value);
                  setEditXvalue({
                    value: e.target.value,
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
        getDatas.datasContainer.interpol.kuadratik &&
        getDatas.datasContainer.interpol.kuadratik.map((data, index) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!!e.target.inputNilai.value) {
                if (
                  getDatas.datasContainer.interpol.kuadratik
                    .map((d) => d.x === "DummyData" || d.y === "DummyData")
                    .indexOf(true) !== -1
                ) {
                  getDatas.datasContainer.interpol.kuadratik[
                    getDatas.datasContainer.interpol.kuadratik
                      .map((d) => d.x === "DummyData" || d.y === "DummyData")
                      .indexOf(true)
                  ].y = editYvalue.value;
                } else if (
                  getDatas.datasContainer.interpol.kuadratik
                    .map((d) => d.x === "DummyData" || d.y === "DummyData")
                    .indexOf(true) === -1
                ) {
                  getDatas.datasContainer.interpol.kuadratik[
                    editYvalue.index
                  ].y = editYvalue.value;
                }
                setEditY([]);
              }
            }}
            key={index}
          >
            <div
              className={styles.tableDatas_Contents}
              onClick={(e) => {
                if (e.detail === 2) {
                  setYDataValues(
                    getDatas.datasContainer.interpol.kuadratik[index].y
                  );
                  setEditX([]);
                  setEditY(index);
                  // TODO:
                  setYDataValues(e.target.value);
                }
              }}
            >
              {data.y}
            </div>
            {editY === index && (
              <input
                type="number"
                autoFocus
                required
                name="inputNilai"
                onChange={(e) => {
                  setYDataValues(e.target.value);
                  setEditYvalue({
                    value: e.target.value,
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
        getDatas.datasContainer.interpol.kuadratik &&
        getDatas.datasContainer.interpol.kuadratik.map((data, index) => (
          <div className={styles.tableDatas_Icon} key={index}>
            {(editX === index || editY === index) && (
              <box-icon
                name="x-circle"
                color="#e78ea9"
                animation="tada-hover"
                onClick={() => {
                  if (
                    getDatas.datasContainer.interpol.kuadratik.find(
                      (d) => d.x === "DummyData" || d.y === "DummyData"
                    )
                      ? true
                      : false
                  ) {
                    getDatas.datasContainer.interpol.kuadratik.splice(
                      getDatas.datasContainer.interpol.kuadratik
                        .map((d) => d.x === "DummyData" || d.y === "DummyData")
                        .indexOf(true),
                      getDatas.datasContainer.interpol.kuadratik
                        .map((d) => d.x === "DummyData" || d.y === "DummyData")
                        .indexOf(true) + 1
                    );
                  }

                  router.replace(router.asPath);
                  setEditX([]);
                  setEditY([]);
                }}
                customTitle="Batal"
              ></box-icon>
            )}
            {getDatas.datasContainer.interpol.kuadratik[index].x !==
              "DummyData" && (
              <box-icon
                name="trash"
                color="#e78ea9"
                animation="tada-hover"
                onClick={() => {
                  getDatas.datasContainer.interpol.kuadratik.splice(index, 1);
                  if (
                    getDatas.datasContainer.interpol.kuadratik
                      .map((d) => d.x === "DummyData" || d.y === "DummyData")
                      .indexOf(true) !== -1
                  ) {
                    getDatas.datasContainer.interpol.kuadratik.splice(
                      getDatas.datasContainer.interpol.kuadratik
                        .map((d) => d.x === "DummyData" || d.y === "DummyData")
                        .indexOf(true),
                      getDatas.datasContainer.interpol.kuadratik
                        .map((d) => d.x === "DummyData" || d.y === "DummyData")
                        .indexOf(true) + 1
                    );
                  }
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
  // mengurutkan dari bilangan terkecil ke yang terbesar
  // getDatas.datasContainer.interpol.kuadratik.sort((a, b) => a.x - b.x)
  // a.x-b.x nilainya negatif maka ambil element[0] atau a.x
  // jika a.x-b.x nilainya positif maka ambil element[1] atau b.x
  const cariTtkTrdkt = (cariX) => {
    if (
      cariX >
      getDatas.datasContainer.interpol.kuadratik.sort((a, b) => a.x - b.x)[0].x
    )
      setMncariTitikTrdkt({
        titikPertama: {
          x: getDatas.datasContainer.interpol.kuadratik.filter(
            (data) => data.x < cariX
          )[
            getDatas.datasContainer.interpol.kuadratik.filter(
              (data) => data.x < cariX
            ).length -
              (getDatas.datasContainer.interpol.kuadratik
                .sort((a, b) => a.x - b.x)
                .filter((data) => data.x < cariX).length > 1
                ? 2
                : 1)
          ].x,
          y: getDatas.datasContainer.interpol.kuadratik.filter(
            (data) => data.x < cariX
          )[
            getDatas.datasContainer.interpol.kuadratik.filter(
              (data) => data.x < cariX
            ).length -
              (getDatas.datasContainer.interpol.kuadratik.filter(
                (data) => data.x < cariX
              ).length > 1
                ? 2
                : 1)
          ].y,
        },
        titikKedua: {
          x: getDatas.datasContainer.interpol.kuadratik.filter(
            (data) => data.x < cariX
          )[
            getDatas.datasContainer.interpol.kuadratik.filter(
              (data) => data.x < cariX
            ).length - 1
          ].x,
          y: getDatas.datasContainer.interpol.kuadratik.filter(
            (data) => data.x < cariX
          )[
            getDatas.datasContainer.interpol.kuadratik.filter(
              (data) => data.x < cariX
            ).length - 1
          ].y,
        },
        titikKetiga: {
          x: getDatas.datasContainer.interpol.kuadratik.filter(
            (data) => data.x > cariX
          )[0].x,
          y: getDatas.datasContainer.interpol.kuadratik.filter(
            (data) => data.x > cariX
          )[0].y,
        },
      });
  };

  return (
    <>
      <div className={styles.ioExecution_sheet}>
        <div className={styles.userInput}>
          <div className={styles.findXContainer}>
            <input
              className={styles.findX_input}
              type="number"
              autoFocus
              placeholder="masukan titik yang di cari(X)"
              onChange={(e) => {
                if (!!getDatas.datasContainer.interpol.kuadratik[0]) {
                  setTtkTarget();
                  if (
                    e.target.value >
                      getDatas.datasContainer.interpol.kuadratik.sort(
                        (a, b) => a.x - b.x
                      )[0].x &&
                    e.target.value <
                      getDatas.datasContainer.interpol.kuadratik.sort(
                        (a, b) => a.x - b.x
                      )[
                        getDatas.datasContainer.interpol.kuadratik.sort(
                          (a, b) => a.x - b.x
                        ).length - 1
                      ].x &&
                    getDatas.datasContainer.interpol.kuadratik
                      .map((data) => data.x)
                      .includes(parseFloat(e.target.value)) == false &&
                    getDatas.datasContainer.interpol.kuadratik.sort(
                      (a, b) => a.x - b.x
                    )[1]?.x < parseFloat(e.target.value)
                      ? true
                      : false
                  ) {
                    cariTtkTrdkt(e.target.value);
                    setXygDicari(e.target.value);
                  }
                  if (
                    e.target.value >=
                    getDatas.datasContainer.interpol.kuadratik.sort(
                      (a, b) => a.x - b.x
                    )[getDatas.datasContainer.interpol.kuadratik.length - 1].x
                  ) {
                    setTtkTarget([]);
                  }
                }
              }}
              value={ttkTarget}
              onFocus={() => {
                if (
                  !!getDatas.datasContainer.interpol.kuadratik[0] &&
                  getDatas.datasContainer.interpol.kuadratik[0].x !==
                    "DummyData"
                ) {
                  if (
                    getDatas.datasContainer.interpol.kuadratik.find(
                      (d) => d.x === "DummyData" || d.y === "DummyData"
                    )
                      ? true
                      : false
                  ) {
                    getDatas.datasContainer.interpol.kuadratik.splice(
                      getDatas.datasContainer.interpol.kuadratik
                        .map((d) => d.x == "DummyData" || d.y == "DummyData")
                        .indexOf(true),

                      getDatas.datasContainer.interpol.kuadratik
                        .map((d) => d.x == "DummyData" || d.y == "DummyData")
                        .indexOf(true) + 1
                    );
                  }
                }
                setEditX([]);
                setEditY([]);
              }}
            />
          </div>
          {console.log({
            x: getDatas.datasContainer.interpol.kuadratik
              .sort((a, b) => a.x - b.x)
              .filter((data) => data.x < 1)[
              getDatas.datasContainer.interpol.kuadratik
                .sort((a, b) => a.x - b.x)
                .filter((data) => data.x < 1).length -
                (getDatas.datasContainer.interpol.kuadratik
                  .sort((a, b) => a.x - b.x)
                  .filter((data) => data.x < 1).length > 1
                  ? 2
                  : 1)
            ]?.x,
          })}
          <div className={styles.tableDatasContainer}>
            <div className={styles.tableDatas}>
              <div className={styles.tableDatas_columnContainer}>
                <div className={styles.tableDatas_column}>
                  <div className={styles.tableDatas_heading}>
                    n<sup></sup>
                  </div>
                  {getDatas.datasContainer.interpol.kuadratik &&
                    getDatas.datasContainer.interpol.kuadratik.map(
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
                  getDatas.datasContainer.interpol.kuadratik.push({
                    x: "DummyData",
                    y: "DummyData",
                  });
                  // router.replace(router.asPath);
                  setEditX(
                    getDatas.datasContainer.interpol.kuadratik
                      .map((d) => d.x === "DummyData")
                      .indexOf(true)
                  );
                  setEditY(
                    getDatas.datasContainer.interpol.kuadratik
                      .map((d) => d.y === "DummyData")
                      .indexOf(true)
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
                  <div className={styles.tableDatas_heading}>
                    n<sup></sup>
                  </div>
                  {mncariTitiktrdkt &&
                    [
                      mncariTitiktrdkt?.titikPertama.x,
                      parseFloat(xYgDicari),
                      mncariTitiktrdkt?.titikKedua.x,
                      mncariTitiktrdkt?.titikKetiga.x,
                    ].map((data, index) => (
                      <div className={styles.tableDatas_Contents} key={index}>
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
                      mncariTitiktrdkt.titikKetiga.x,
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
                      b0 +
                        b1 * (xYgDicari - mncariTitiktrdkt?.titikPertama.x) +
                        b2 *
                          (xYgDicari - mncariTitiktrdkt?.titikPertama.x) *
                          (xYgDicari - mncariTitiktrdkt?.titikKedua.x),
                      // mncariTitiktrdkt.titikPertama.y +
                      //   ((mncariTitiktrdkt.titikKedua.y -
                      //     mncariTitiktrdkt.titikPertama.y) /
                      //     (mncariTitiktrdkt.titikKedua.x -
                      //       mncariTitiktrdkt.titikPertama.x)) *
                      //     (xYgDicari - mncariTitiktrdkt.titikPertama.x) +
                      //   xYgDicari *
                      //     (xYgDicari - mncariTitiktrdkt.titikPertama.x) *
                      //     (xYgDicari - mncariTitiktrdkt.titikKedua.x),
                      mncariTitiktrdkt.titikKedua.y,
                      mncariTitiktrdkt.titikKetiga.y,
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
      <Script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js" />
    </>
  );
}

export default Kuadratik;
