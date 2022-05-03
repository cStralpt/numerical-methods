import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import * as d3 from "d3";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

export default function Home() {
  const [dataContainer, setDataContainer] = useState([
    { x: 2010, y: 7481604 },
    { x: 2013, y: 7828740 },
    { x: 2025, y: 10974825 },
    { x: 2016, y: 8160901 },
    { x: 2020, y: 8567923 },
    { x: 2018, y: 8370320 },
    { x: 2022, y: 9654872 },
  ]);
  // <sort data from low to highest value: >
  dataContainer.sort((a, b) => a.x - b.x);
  // console.log(dataContainer.sort((a, b) => a.x - b.x)[dataContainer.length - 1].x);
  // </sort data from low to highest value>

  const [xYgDicari, setXygDicari] = useState();
  const [mncariTitiktrdkt, setMncariTitikTrdkt] = useState();
  const [ttkTarget, setTtkTarget] = useState();
  const router = useRouter();
  const [countR, setCountR] = useState([
    mncariTitiktrdkt?.titikPertama.x,
    parseInt(xYgDicari),
    mncariTitiktrdkt?.titikKedua.x,
  ]);
  const [editX, setEditX] = useState();
  const [editY, setEditY] = useState();
  const [editXvalue, setEditXvalue] = useState();
  const [editYvalue, setEditYvalue] = useState();
  const [showAddDatButton, setShowAddDatButton] = useState();
  const [graphDatas, setGraphDatas] = useState([
    [7481604, 2010],
    [8567923, 2020],
  ]);
  const takeSVG = useRef();
  const takeSVGContainer = useRef();
  const options = {
    series: [
      {
        name: "Data1",
        data: graphDatas,
      },
    ],
    title: {
      text: "Interpolasi Polynomial Lenier",
    },
  };
  useEffect(() => {
    // const svg = d3
    //   .select(takeSVG.current)
    //   .attr("width", "100%")
    //   .attr("height", "100%")
    //   .attr("overflow", "visible")
    //   .style("background", "#fffbe7");
    // const xScale = d3
    //   .scaleLinear()
    //   .domain([0, graphDatas.length - 1])
    //   .range([0, takeSVGContainer.current.offsetWidth]);
    // const yScale = d3
    //   .scaleLinear()
    //   .domain([0, graphDatas[graphDatas.length - 1]])
    //   .range([takeSVGContainer.current.offsetHeight, 0]);
    // const generateScaledLine = d3
    //   .line()
    //   .x((d, i) => xScale(i))
    //   .y(yScale);
    // console.log(yScale);
    // // .curve(d3.curveCardinal);
    // svg
    //   .selectAll(".line")
    //   .data([graphDatas])
    //   .join("path")
    //   .attr("d", (d) => generateScaledLine(d))
    //   .attr("fill", "none")
    //   .style("stroke", "#E78EA9");
    // const xAxis = d3
    //   .axisLeft(xScale)
    //   .ticks(3)
    //   .tickFormat((d, i) => i);
    // const yAxis = d3.axisBottom(yScale).ticks(3);
    // svg.append("g").call(xAxis);
    // .attr(
    //   "transform",
    //   `translate(0,${takeSVGContainer.current.offsetHeight})`
    // );
    // svg.append("g").call(yAxis);
    setGraphDatas([
      [mncariTitiktrdkt?.titikPertama.y, mncariTitiktrdkt?.titikPertama.x],
      [mncariTitiktrdkt?.titikKedua.y, mncariTitiktrdkt?.titikKedua.x],
    ]);
    console.log(graphDatas);
  }, [xYgDicari]);
  const clearValues = (e) => {
    if (
      e >= dataContainer.sort((a, b) => a.x - b.x)[0].x &&
      e <=
        dataContainer.sort((a, b) => a.x - b.x)[dataContainer.length - 1].x &&
      dataContainer.map((data) => data.x).includes(parseInt(e))
    ) {
      // alert("asdkasjd");
      setTtkTarget([]);
    } else if (
      e > dataContainer.sort((a, b) => a.x - b.x)[dataContainer.length - 1].x
    ) {
      setTtkTarget([]);
    }
  };
  const cariTtkTrdkt = (cariX) => {
    if (cariX > dataContainer.sort((a, b) => a.x - b.x)[0].x)
      setMncariTitikTrdkt({
        titikPertama: {
          x: dataContainer[
            dataContainer
              .map((data) => cariX - data.x)
              .indexOf(
                dataContainer
                  .map((data) => cariX - data.x)
                  .filter((a) => a > 0)
                  .sort((a, b) => a - b)[0]
              )
          ]?.x,
          y: dataContainer[
            dataContainer
              .map((data) => cariX - data.x)
              .indexOf(
                dataContainer
                  .map((data) => cariX - data.x)
                  .filter((a) => a > 0)
                  .sort((a, b) => a - b)[0]
              )
          ]?.y,
        },
        titikKedua: {
          x: dataContainer[
            dataContainer
              .map((data) => data.x - cariX)
              .indexOf(
                dataContainer
                  .map((data) => data.x - cariX)
                  .filter((a) => a > 0)
                  .sort((a, b) => a - b)[0]
              )
          ]?.x,
          y: dataContainer[
            dataContainer
              .map((data) => data.x - cariX)
              .indexOf(
                dataContainer
                  .map((data) => data.x - cariX)
                  .filter((a) => a > 0)
                  .sort((a, b) => a - b)[0]
              )
          ]?.y,
        },
      });
    console.log({
      titikPertama: {
        x: dataContainer[
          dataContainer
            .map((data) => cariX - data.x)
            .indexOf(
              dataContainer
                .map((data) => cariX - data.x)
                .filter((a) => a > 0)
                .sort((a, b) => a - b)[0]
            )
        ]?.x,
        y: dataContainer[
          dataContainer
            .map((data) => cariX - data.x)
            .indexOf(
              dataContainer
                .map((data) => cariX - data.x)
                .filter((a) => a > 0)
                .sort((a, b) => a - b)[0]
            )
        ]?.y,
      },
      titikKedua: {
        x: dataContainer[
          dataContainer
            .map((data) => data.x - cariX)
            .indexOf(
              dataContainer
                .map((data) => data.x - cariX)
                .filter((a) => a > 0)
                .sort((a, b) => a - b)[0]
            )
        ]?.x,
        y: dataContainer[
          dataContainer
            .map((data) => data.x - cariX)
            .indexOf(
              dataContainer
                .map((data) => data.x - cariX)
                .filter((a) => a > 0)
                .sort((a, b) => a - b)[0]
            )
        ]?.y,
      },
    });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Metode Numerik</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <main className={styles.main}>
        <div className={styles.dataContainer}>
          <div className={styles.dataContainer_input}>
            <div className={styles.dataContainer_input_dataTable}>
              <div className={styles.dataContainer_input_dataTable_Container}>
                <div className={styles.ioData}>
                  <div
                    className={
                      styles.dataContainer_input_dataTable_inputContaner
                    }
                  >
                    <div
                      className={styles.dataContainer_inout_dataTable_heading}
                    >
                      <h4
                        className={
                          styles.dataContainer_input_dataTable_heading_name
                        }
                      >
                        <div
                          className={
                            styles.dataContainer_inout_dataTable_heading_textContainer
                          }
                        >
                          n<sup></sup>
                        </div>
                      </h4>
                    </div>
                    {dataContainer &&
                      dataContainer.map((data, index) => (
                        <div
                          className={
                            styles.dataContainer_inout_dataTable_inputData
                          }
                          key={index}
                        >
                          {index + 1}
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  className={styles.dataContainer_input_dataTable_inputContaner}
                >
                  <div className={styles.dataContainer_inout_dataTable_heading}>
                    <h4
                      className={
                        styles.dataContainer_input_dataTable_heading_name
                      }
                    >
                      <div
                        className={
                          styles.dataContainer_inout_dataTable_heading_textContainer
                        }
                      >
                        <sup>X</sup>n
                      </div>
                    </h4>
                  </div>
                  {dataContainer &&
                    dataContainer
                      .sort((a, b) => a - b)
                      .map((data, index) => (
                        <div
                          className={
                            styles.dataContainer_inout_dataTable_inputData_realtiveContainer
                          }
                          key={index}
                        >
                          <div
                            className={
                              styles.dataContainer_inout_dataTable_inputData
                            }
                            onClick={(e) => {
                              if (e.detail === 2) {
                                setEditX(index);
                                setEditY([]);
                              }
                            }}
                            // onKeyPressCapture={}
                          >
                            {data.x}
                          </div>
                          {editX === index && (
                            <form
                              className={
                                styles.dataContainer_inout_dataTable_inputData_editDataContainer
                              }
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (!!e.target.inputNilai.value) {
                                  if (
                                    dataContainer[dataContainer.length - 1]
                                      .y === "DummyData"
                                  ) {
                                    alert("isi sumbu Y dulu");
                                  } else if (
                                    dataContainer[dataContainer.length - 1]
                                      .y !== "DummyData"
                                  ) {
                                    dataContainer[editXvalue.index].x =
                                      editXvalue.value;
                                    setEditX([]);
                                  }
                                }
                              }}
                            >
                              <input
                                type="number"
                                autoFocus
                                name="inputNilai"
                                className={
                                  styles.dataContainer_inout_dataTable_inputData_editDataContainer_input
                                }
                                onChange={(e) => {
                                  // console.log(e.target.value);
                                  setEditXvalue({
                                    value: parseInt(e.target.value),
                                    index: index,
                                  });
                                }}
                              />
                            </form>
                          )}
                        </div>
                      ))}
                </div>
                <div
                  className={styles.dataContainer_input_dataTable_inputContaner}
                >
                  <div className={styles.dataContainer_inout_dataTable_heading}>
                    <h4
                      className={
                        styles.dataContainer_input_dataTable_heading_name
                      }
                    >
                      <div
                        className={
                          styles.dataContainer_inout_dataTable_heading_textContainer
                        }
                      >
                        <sup>Y</sup>n
                      </div>
                    </h4>
                  </div>
                  {dataContainer &&
                    dataContainer.map((data, index) => (
                      <div
                        className={
                          styles.dataContainer_inout_dataTable_inputData_realtiveContainer
                        }
                        key={index}
                      >
                        <div
                          className={
                            styles.dataContainer_inout_dataTable_inputData
                          }
                          key={index}
                          onClick={(e) => {
                            if (e.detail === 2) {
                              setEditY(index);
                              setEditX([]);
                            }
                          }}
                          onMouseEnter={() => {
                            setShowAddDatButton(true);
                          }}
                        >
                          {data.y}
                        </div>
                        {editY === index && (
                          <form
                            className={
                              styles.dataContainer_inout_dataTable_inputData_editDataContainer
                            }
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (!!e.target.inputNilai.value) {
                                dataContainer[editYvalue.index].y =
                                  editYvalue.value;
                                setEditY([]);
                              }
                            }}
                          >
                            <input
                              type="number"
                              autoFocus
                              name="inputNilai"
                              className={
                                styles.dataContainer_inout_dataTable_inputData_editDataContainer_input
                              }
                              onChange={(e) =>
                                setEditYvalue({
                                  value: parseInt(e.target.value),
                                  index: index,
                                })
                              }
                            />
                          </form>
                        )}
                        {showAddDatButton &&
                          index === dataContainer.length - 1 &&
                          (dataContainer[dataContainer.length - 1].y !==
                            "DummyData") ===
                            true &&
                          dataContainer[dataContainer.length - 1].x !==
                            "DummyData" && (
                            <div
                              className={styles.addDataBtn}
                              onClick={() => {
                                dataContainer.push({
                                  x: "DummyData",
                                  y: "DummyData",
                                });
                                // dataContainer.splice(1, 1);
                                router.replace(router.asPath);
                                setEditX(dataContainer.length - 1);
                                setEditY(dataContainer.length - 1);
                              }}
                            >
                              <i class="bx bx-plus-circle"></i>
                            </div>
                          )}
                        <div
                          className={styles.deleteDataIcon}
                          onClick={() => {
                            // alert("fuck");
                            dataContainer.splice(index, 1);
                            router.replace(router.asPath);
                            setEditX([]);
                            setEditY([]);
                          }}
                        >
                          <i class="bx bxs-trash"></i>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.inputData_exec}>
                <div className={styles.inputData_exec_heading}>X?</div>
                <div className={styles.inputData_exec_input}>
                  <input
                    className={styles.cariX}
                    type="number"
                    onChange={(e) => {
                      // console.log(
                      //   dataContainer.sort((a, b) => a - b)[0].x > 201
                      // );
                      if (!!dataContainer[0]) {
                        setTtkTarget();
                        e.target.value >
                          dataContainer.sort((a, b) => a - b)[0].x ===
                          true &&
                        e.target.value <
                          dataContainer.sort((a, b) => a - b)[
                            dataContainer.length - 1
                          ].x ===
                          true &&
                        dataContainer
                          .map((data) => data.x)
                          .includes(parseInt(e.target.value)) === false
                          ? cariTtkTrdkt(e.target.value)
                          : clearValues(e.target.value);
                        if (
                          e.target.value >
                            dataContainer.sort((a, b) => a - b)[0].x ===
                            true &&
                          e.target.value <
                            dataContainer.sort((a, b) => a - b)[
                              dataContainer.length - 1
                            ].x ===
                            true &&
                          dataContainer
                            .map((data) => data.x)
                            .includes(parseInt(e.target.value)) === false
                        )
                          setXygDicari(e.target.value);
                      }
                    }}
                    value={ttkTarget}
                    onFocus={(e) => {
                      setEditX([]);
                      setEditY([]);
                      if (!!e.target.value && !!dataContainer[0]) {
                        if (
                          dataContainer[dataContainer.length - 1].y ===
                            "DummyData" ||
                          dataContainer[dataContainer.length - 1].x ===
                            "DummyData"
                        ) {
                          dataContainer.splice(dataContainer.length - 1, 1);
                        }
                      }
                    }}
                    placeholder="masukan titik yang di cari"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tabsBar}>tabs</div>
          <div className={styles.toolsNav}>TN</div>
          <div className={styles.resultsContainer}>
            <div className={styles.graph}>
              <h4 className={styles.graph_heading}>Graph</h4>
              <div className={styles.graphResults} ref={takeSVGContainer}>
                {/* <svg ref={takeSVG}></svg> */}
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                ></HighchartsReact>
              </div>
            </div>
            <div className={styles.results_data}>
              <h4 className={styles.results_data_heading}>Result</h4>
              <div className={styles.results_data_value}>
                {mncariTitiktrdkt && (
                  <>
                    <div className={styles.ioData}>
                      <div
                        className={
                          styles.dataContainer_input_dataTable_inputContaner
                        }
                      >
                        <div
                          className={
                            styles.dataContainer_inout_dataTable_heading
                          }
                        >
                          <h4
                            className={
                              styles.dataContainer_input_dataTable_heading_name
                            }
                          >
                            <div
                              className={
                                styles.dataContainer_input_dataTable_heading_name_TextContainer
                              }
                            >
                              n<sup></sup>
                            </div>
                          </h4>
                        </div>
                        {mncariTitiktrdkt &&
                          countR.map((data, index) => (
                            <div
                              className={
                                styles.dataContainer_inout_dataTable_inputData
                              }
                              key={index}
                            >
                              {index + 1}
                            </div>
                          ))}
                      </div>
                    </div>
                    <div
                      className={
                        styles.dataContainer_input_dataTable_inputContaner
                      }
                    >
                      <div
                        className={styles.dataContainer_inout_dataTable_heading}
                      >
                        <h4
                          className={
                            styles.dataContainer_input_dataTable_heading_name
                          }
                        >
                          <div
                            className={
                              styles.dataContainer_input_dataTable_heading_name_TextContainer
                            }
                          >
                            <sup>X</sup>n
                          </div>
                        </h4>
                      </div>
                      {mncariTitiktrdkt &&
                        [
                          mncariTitiktrdkt.titikPertama.x,
                          parseInt(xYgDicari),
                          mncariTitiktrdkt.titikKedua.x,
                        ].map((data, index) => (
                          <div
                            className={
                              styles.dataContainer_inout_dataTable_inputData
                            }
                            key={index}
                          >
                            {data}
                            {/* {setCountR(+1)} */}
                          </div>
                        ))}
                    </div>
                    <div
                      className={
                        styles.dataContainer_input_dataTable_inputContaner
                      }
                    >
                      <div
                        className={styles.dataContainer_inout_dataTable_heading}
                      >
                        <h4
                          className={
                            styles.dataContainer_input_dataTable_heading_name
                          }
                        >
                          <div
                            className={
                              styles.dataContainer_input_dataTable_heading_name_TextContainer
                            }
                          >
                            <sup>Y</sup>n
                          </div>
                        </h4>
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
                          <div
                            className={
                              styles.dataContainer_inout_dataTable_inputData
                            }
                            key={index}
                          >
                            {data}
                          </div>
                        ))}
                    </div>
                  </>
                )}
                {/* hasilnya */}
                {/* {Math.round(
                  mncariTitiktrdkt?.titikPertama.y +
                    ((mncariTitiktrdkt?.titikKedua.y -
                      mncariTitiktrdkt?.titikPertama.y) /
                      (mncariTitiktrdkt?.titikKedua.x -
                        mncariTitiktrdkt?.titikPertama.x)) *
                      (xYgDicari - mncariTitiktrdkt?.titikPertama.x)
                )} */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
