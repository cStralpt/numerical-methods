import { useRouter } from "next/router";
import Home from "../../Components/Home";
import { useContext } from "react";
import { DatasState } from "../../Components/DatasContainer";
function AppId() {
  const [getDatas, setDatas] = useContext(DatasState);
  const router = useRouter();
  return (
    <Home
      methodId={
        getDatas.methods.find((datas) => datas.slug === router.query.methodId)
          ?.methodId
      }
    />
  );
}

export default AppId;
