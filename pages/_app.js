import "../styles/globals.css";
import PopupCmpGState from "../Components/PopUpGlobalState";
import IntegerGlobalState from "../Components/IntegerGlobalState";
import DatasContainer from "../Components/DatasContainer";
import AppPath from "../Components/AppPath";
import AkarPrsmnState from "../Components/AkarPrsmnState";
function MyApp({ Component, pageProps }) {
  return (
    <PopupCmpGState>
      <IntegerGlobalState>
        <DatasContainer>
          <AppPath>
            <AkarPrsmnState>
              <Component {...pageProps} />
            </AkarPrsmnState>
          </AppPath>
        </DatasContainer>
      </IntegerGlobalState>
    </PopupCmpGState>
  );
}

export default MyApp;
