import { useContext, useState } from "react";
import styles from "/styles/AkarPrsmnWindow.module.css";
import { akarPersamaanState } from "../AkarPrsmnState";

import { DatasState } from "../DatasContainer";
function AkarPrsmnWindow() {
  const [getDatas, setDatas] = useContext(DatasState);
  const [getAkarPrsmnWindow, setAkarPrsmnWindow] =
    useContext(akarPersamaanState);
  return (
    <div className={styles.windowContainer}>
      <div className={styles.akarPersamaan_Input}>
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
        <div className={styles.closeWindowBtn}>
          <i
            class="bx bx-x-circle"
            onClick={() => {
              setAkarPrsmnWindow(false);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default AkarPrsmnWindow;
