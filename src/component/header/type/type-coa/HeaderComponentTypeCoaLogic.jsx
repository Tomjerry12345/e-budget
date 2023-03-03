import { useEffect, useState } from "react";

const HeaderComponentTypeCoaLogic = ({ onChangeTambahData, onChangeLoadingUpload }) => {
  const [isImport, setImport] = useState(false);
  const [isTambahData, setIsTambahData] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [more, setMore] = useState(false);

  useEffect(() => {
    onChangeTambahData(setIsTambahData);
    onChangeLoadingUpload(setLoadingUpload, setImport)
  }, [onChangeTambahData, onChangeLoadingUpload]);

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

  const onClickMore = () => {
    setMore(true);
  };

  const onCloseMore = () => {
    setMore(false);
  };

  return {
    value: {
      isImport,
      isTambahData,
      loadingUpload,
      more
    },
    func: {
      onClickImport,
      onCloseImport,
      onClickTambahData,
      onCloseTambahData,
      onClickMore,
      onCloseMore
    },
  };
};

export default HeaderComponentTypeCoaLogic;
