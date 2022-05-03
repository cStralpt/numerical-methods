import { useRouter } from "next/router";
import Home from "../../Components/Home";
function AppId() {
  const router = useRouter();
  const appId = (appId) => {
    if (appId === "interpolasi-polynomial") {
      return "Interpolasi Polynomial";
    } else {
      return false;
    }
  };
  return <Home appId={appId(router.query.appId)} />;
}

export default AppId;
