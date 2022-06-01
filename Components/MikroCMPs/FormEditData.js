import { useContext, useState } from "react";
import styles from "../../styles/InterPolyLenier.module.css";
import { DatasState } from "../../Components/DatasContainer";
import { useRouter } from "next/router";
import Script from "next/script";
const FormEditData = ({ depsData }) => {
  const [getDatas, setDatas] = useContext(DatasState);
  const [editX, setEditX] = useState();
  const [editY, setEditY] = useState();
  const router = useRouter();
  if (depsData === "x") {
    return (
      getDatas.datasContainer.biseksi &&
      getDatas.datasContainer.biseksi.batasAtas.map((data, index) => (
        <>
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
                } else if (
                  getDatas.datasContainer.biseksi.batasBawah[index] !==
                  "DummyData"
                ) {
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
                  setXDataValues(
                    getDatas.datasContainer.biseksi.batasBawah[index]
                  );
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
          <Script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js" />
        </>
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
              } else if (
                getDatas.datasContainer.biseksi.batasBawah[editY] !==
                "DummyData"
              ) {
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
                setXDataValues(
                  getDatas.datasContainer.biseksi.batasAtas[index]
                );
                setYDataValues(
                  getDatas.datasContainer.biseksi.batasBawah[index]
                );
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
export default FormEditData;
