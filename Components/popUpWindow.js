import pupStyles from "../styles/popUp.module.css";
import { useState, createContext, useContext, useEffect } from "react";
import Link from "next/link";
import Draggable, { DraggableCore } from "react-draggable";

import { PopupCtx } from "./PopUpGlobalState";
function PopUpWindow() {
  const [getDraggable, setDraggable] = useState(true);
  const [isWindowCLosed, setWindowCLosed] = useState(false);
  const [triggerClosedWin, setTriggerClosedWin] = useState("awokawok");
  const [popUpstate, setPopUpState] = useContext(PopupCtx);
  const appList = [
    {
      appId: "Interpolasi Polynomial",
      slug: "interpolasi-polynomial",
    },
  ];
  useEffect(() => {
    if (isWindowCLosed == true) {
      const timer = setTimeout(() => {
        setPopUpState(false);
      }, 130);
      return () => clearTimeout(timer);
    }
  }, [isWindowCLosed]);
  return (
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
            pupStyles.popUpWindow,
            `${
              isWindowCLosed
                ? pupStyles.popUpWindow_closed
                : pupStyles.popUpWindow_opened
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
              <ion-icon name="calculator"></ion-icon>
              Apps List
            </h5>
            <div className={pupStyles.popUpWindow_header_actionContainer}>
              {[1, 2, 3].map((data) => (
                <span
                  className={pupStyles.header_ActionBtn}
                  onClick={() => setWindowCLosed(true)}
                  onMouseEnter={() => {
                    setDraggable(false);
                  }}
                  onMouseLeave={() => {
                    setDraggable(true);
                  }}
                ></span>
              ))}
            </div>
          </header>
          <main className={pupStyles.popUpWindow_main}>
            <div className={pupStyles.popUpWindow_mainAppItem_Container}>
              {appList.map((items) => (
                <Link href={"/apps/" + items.slug}>
                  <div
                    className={pupStyles.main_appItem}
                    onClick={() => setPopUpState(false)}
                  >
                    <div className={pupStyles.main_appIcon}>
                      <ion-icon name="folder"></ion-icon>
                      <ion-icon name="extension-puzzle"></ion-icon>
                      <box-icon name="math" color="silver"></box-icon>
                    </div>
                    <div className={pupStyles.main_appName}>{items.appId}</div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </Draggable>
    </div>
  );
}

export default PopUpWindow;
