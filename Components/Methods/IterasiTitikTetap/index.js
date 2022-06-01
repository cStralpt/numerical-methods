import React, { useState } from "react";
import styles from "/styles/Home.module.css";
import TitikTetapWindow from "./TitikTetap";
function Index() {
  const [biseksiTabs, setBiseksiTabs] = useState("Titik Tetap");
  const [tabsContainer] = useState(["Titik Tetap"]);
  const [radioIsCheck, setRadioCheck] = useState(true);
  return (
    <div className={styles.ioExecution_sheetsContainer}>
      <div className={styles.ioExecution_sheetsBar}>
        <div className={styles.ioExecution_barBtn_Container}>
          {tabsContainer.map((d, index) => (
            <div className={styles.barBtnpacker} key={index}>
              <input
                type="radio"
                id={d}
                checked={d === "Titik Tetap" && radioIsCheck}
                name="tabIndicator"
                className={styles.ioExecution_barBtn_tabIndicator}
              />
              <div className={styles.ioExecution_barBtn}>
                <h6 className={styles.bartBtn_title}>{d}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TitikTetapWindow />
    </div>
  );
}
export default Index;
