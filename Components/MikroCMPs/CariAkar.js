import React from 'react'

function CariAkar() {
  return (
    <div>CariAkar</div>
  )
}
const cariAkar = (batasAtas, batasBawah) => {
    if (
      !!getDatas.datasContainer.biseksi.batasBawah[0] &&
      !!getDatas.datasContainer.biseksi.batasAtas[0]
    ) {
      let akarTrgt = BeginBisection(batasAtas, batasBawah, toleransiE);
      setAkaraTarget(akarTrgt);
    }
  };
export default CariAkar