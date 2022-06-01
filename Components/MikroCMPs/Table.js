import React, { useContext } from "react";
import styles from "../../styles/InterPolyLenier.module.css";
import { DatasState } from "../../Components/DatasContainer";
import FormEditData from "./FormEditData";

function Table({ tbDatas }) {
  const [getDatas, setDatas] = useContext(DatasState);
  return (
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
  );
}

export default Table;
