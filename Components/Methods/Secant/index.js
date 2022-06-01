import React, { useState } from "react";
import styles from "/styles/Home.module.css";
import Secant from "./Secant";
function Index() {
  const [biseksiTabs, setBiseksiTabs] = useState("Secant");
  const [tabsContainer] = useState(["Secant"]);
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
                checked={d === "Secant" && radioIsCheck}
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
      <Secant />
    </div>
  );
}
export default Index;
