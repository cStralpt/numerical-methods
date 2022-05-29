import { useRouter } from "next/router";
import Home from "../../Components/Home";
import { useContext } from "react";
import { DatasState } from "../../Components/DatasContainer";
function AppId() {
  const [getDatas, setDatas] = useContext(DatasState);
  const router = useRouter();
  const methodId = (methodId) => {
    if (methodId === "interpolasi-polynomial") {
      return "Interpolasi Polynomial";
    } else if (methodId === "biseksi") {
      return "Biseksi";
    }
     else if (methodId === "regula-falsi") {
      return "Regula Falsi";
    }
     else if (methodId === "secant") {
      return "Secant";
    }
     else {
      return false;
    }
  };
  return <Home methodId={methodId(router.query.methodId)} />;
}

export default AppId;
