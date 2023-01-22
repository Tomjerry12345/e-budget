import { useEffect, useState } from "react";

const HeaderComponentTypeCoaLogic = () => {
  const [isImport, setImport] = useState(false);
  const [isTambahData, setIsTambahData] = useState(false);

  const onClickImport = () => {
    setImport(true);
  };

  const onCloseImport = () => {
    setImport(false);
  };

  const onClickTambahData = () => {
    setIsTambahData(true);
  };

  const onCloseTambahData = () => {
    setIsTambahData(false);
  };

  return {
    value: {
      isImport,
      isTambahData,
    },
    func: {
      onClickImport,
      onCloseImport,
      onClickTambahData,
      onCloseTambahData,
    },
  };
};

export default HeaderComponentTypeCoaLogic;
