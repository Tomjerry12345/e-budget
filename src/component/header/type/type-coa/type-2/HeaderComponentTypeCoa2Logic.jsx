import { useEffect, useState } from "react";

const HeaderComponentTypeCoa2Logic = ({ onChangeTambahData, onChangeLoadingUpload, accesFile }) => {
  const [isImport, setImport] = useState(false);
  const [isImport2, setImport2] = useState(false);
  const [isTambahData, setIsTambahData] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [more, setMore] = useState(false);

  useEffect(() => {
    onChangeTambahData(setIsTambahData);
    onChangeLoadingUpload(setLoadingUpload, setImport, setImport2, setMore)
  }, [onChangeTambahData, onChangeLoadingUpload]);

  const onClickImport = () => {
    setImport(true);
  };

  const onCloseImport = () => {
    setImport(false);
    onCloseMore()
    accesFile.acceptedFiles.length = 0;
  };

  const onClickImport2 = () => {
    setImport2(true);
  };

  const onCloseImport2 = () => {
    setImport2(false);
    onCloseMore()
    accesFile.acceptedFiles.length = 0;
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
      isImport2,
      isTambahData,
      loadingUpload,
      more
    },
    func: {
      onClickImport,
      onCloseImport,
      onClickImport2,
      onCloseImport2,
      onClickTambahData,
      onCloseTambahData,
      onClickMore,
      onCloseMore
    },
  };
};

export default HeaderComponentTypeCoa2Logic;
