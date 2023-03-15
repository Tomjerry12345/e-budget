import { useEffect, useState } from "react";

const HeaderComponentTypeInputLogic = ({ onChangeFilter, onChangeLoadingUpload }) => {
  const [filter, setFilter] = useState(false);
  const [more, setMore] = useState(false);
  const [isImport, setImport] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  useEffect(() => {
    onChangeFilter(setFilter);
    onChangeLoadingUpload(setLoadingUpload, setImport);
  }, [onChangeFilter, onChangeLoadingUpload]);

  const onCilckFilter = () => {
    setFilter(true);
  };

  const onCloseFilter = () => {
    setFilter(false);
  };

  const onClickMore = () => {
    setMore(true);
  };

  const onCloseMore = () => {
    setMore(false);
  };

  const onClickImport = () => {
    setImport(true);
  };

  const onCloseImport = () => {
    setImport(false);
  };

  return {
    value: {
      more,
      filter,
      isImport,
      loadingUpload,
    },
    func: {
      onCilckFilter,
      onCloseFilter,
      onClickMore,
      onCloseMore,
      onClickImport,
      onCloseImport,
    },
  };
};

export default HeaderComponentTypeInputLogic;
