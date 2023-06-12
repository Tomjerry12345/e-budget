import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { allRouting } from "values/RoutingPage";
import { getKeyByValue } from "values/Utilitas";

const HeaderComponentTypeSummaryLogic = ({ onChangeFilter, onChangeLoadingUpload }) => {
  const [filter, setFilter] = useState(false);
  const [more, setMore] = useState(false);
  const [isImport, setImport] = useState(false);
  const [header, setHeader] = useState("");

  const location = useLocation();

  useEffect(() => {
    const split = location.pathname.split("/");
    const q = split[split.length - 1];

    const h = getKeyByValue(allRouting[split[2]], q);

    setHeader(h[1]);
  }, []);

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
      header,
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

export default HeaderComponentTypeSummaryLogic;
