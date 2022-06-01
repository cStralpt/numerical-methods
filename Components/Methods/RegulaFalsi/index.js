import React, { useState } from "react";
import styles from "/styles/Home.module.css";
import RegulaFalsi from "./RegulaFalsi";
function Index() {
  const [biseksiTabs, setBiseksiTabs] = useState("Regula Falsi");
  const [tabsContainer] = useState(["Regula Falsi"]);
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
                checked={d === "Regula Falsi" && radioIsCheck}
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
      <RegulaFalsi />
    </div>
  );
}
export default Index;
