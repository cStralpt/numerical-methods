import React, { useState } from "react";
import styles from "/styles/Home.module.css";
import EliminasiGauss from "./EliminasiGauss";
function Index() {
  const [biseksiTabs, setBiseksiTabs] = useState("Eliminasi Gauss");
  const [tabsContainer] = useState(["Eliminasi Gauss"]);
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
                checked={d === "Eliminasi Gauss" && radioIsCheck}
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
      <EliminasiGauss />
    </div>
  );
}
export default Index;
