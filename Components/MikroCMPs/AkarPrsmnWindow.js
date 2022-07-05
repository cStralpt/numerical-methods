import { useContext, useEffect, useState } from "react";
import { akarPersamaanState } from "../AkarPrsmnState";
import pupStyles from "../../styles/popUp.module.css";
import styles from "/styles/AkarPrsmnWindow.module.css";
import { PopupCtx } from "../PopUpGlobalState";
import { DatasState } from "../DatasContainer";
import Draggable, { DraggableCore } from "react-draggable";
function AkarPrsmnWindow({ method }) {
  const [getDatas, setDatas] = useContext(DatasState);
  const [getAkarPrsmnWindow, setAkarPrsmnWindow] =
    useContext(akarPersamaanState);
  const [getDraggable, setDraggable] = useState(true);
  const [isWindowCLosed, setWindowCLosed] = useState(false);
  const [triggerClosedWin, setTriggerClosedWin] = useState("awokawok");
  const [popUpstate, setPopUpState] = useContext(PopupCtx);
  useEffect(() => {
    if (isWindowCLosed == true) {
      const timer = setTimeout(() => {
        setAkarPrsmnWindow(false);
      }, 130);
      return () => clearTimeout(timer);
    }
  }, [isWindowCLosed]);
  const takeAkarPersamaan = (e) => {
    e.preventDefault();
    const akarPersamaan = eval(`getDatas.datasContainer.${method}.akarPrsmn`);
    akarPersamaan.splice(0, 1, e.target.akarPersamaan.value);
    const x = 2;
    console.log(getDatas.datasContainer.Bijeksi.akarPrsmn[0]);
  };
  return (
    <div className={styles.windowContainer}>
      <div className={[pupStyles.popupContainer]}>
        <div
          className={[
            isWindowCLosed
              ? pupStyles.container_backDropClosed
              : pupStyles.container_backDropOpened,
          ]}
        ></div>
        <Draggable disabled={getDraggable}>
          <div
            className={[
              styles.popUpWindow,
              `${
                isWindowCLosed
                  ? pupStyles.popUpWindow_closed
                  : styles.popUpWindow_opened
              }`,
            ]}
          >
            <header
              className={pupStyles.popUpWindow_header}
              onMouseEnter={() => {
                setDraggable(false);
              }}
              onMouseLeave={() => {
                setDraggable(true);
              }}
            >
              <h5 className={pupStyles.popUp_header_windowName}>
                {/* <ion-icon name="calculator"></ion-icon> */}
                <div className={styles.akarPrsmn_Logo}>
                  x<sup>12</sup>
                </div>
                Akar Persamaan
              </h5>
              <div className={pupStyles.popUpWindow_header_actionContainer}>
                {[1, 2, 3].map((data, index) => (
                  <span
                    className={pupStyles.header_ActionBtn}
                    onClick={() => setWindowCLosed(true)}
                    onMouseEnter={() => {
                      setDraggable(false);
                    }}
                    onMouseLeave={() => {
                      setDraggable(true);
                    }}
                    key={index}
                  ></span>
                ))}
              </div>
            </header>
            <main className={pupStyles.popUpWindow_main}>
              <form
                className={styles.akarPrsmnContainer}
                onSubmit={(e) => takeAkarPersamaan(e)}
              >
                <div className={styles.akarPrsmn_Input_Container}>
                  <div className={styles.inputAkar_Container}>
                    <label
                      className={styles.inputAkar_Label}
                      htmlFor="inputAkar"
                    >
                      Masukan Akar Persamaan
                    </label>
                    <input
                      className={styles.inputAkar}
                      id="inputAkar"
                      name="akarPersamaan"
                    />
                  </div>
                  <div className={styles.outputAkar_Container}>
                    <label
                      className={styles.outputAkar_Label}
                      htmlFor="outputAkar"
                    >
                      Output:
                    </label>
                    <div className={styles.outputAkar} id="outputAkar">
                      Output
                    </div>
                  </div>
                </div>
                <div className={styles.btnContainer}>
                  <button className={styles.submitBtn} type="submit">
                    SIMPAN
                  </button>
                </div>
              </form>
            </main>
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default AkarPrsmnWindow;
