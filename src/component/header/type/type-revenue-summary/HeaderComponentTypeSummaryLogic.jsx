import { useEffect, useState } from "react";

const HeaderComponentTypeRevenueSummaryLogic = ({ onChangeFilter }) => {
  const [filter, setFilter] = useState(false);
  const [more, setMore] = useState(false);
  const [isImport, setImport] = useState(false);

  useEffect(() => {
    onChangeFilter(setFilter);
  }, [onChangeFilter]);

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

export default HeaderComponentTypeRevenueSummaryLogic;
