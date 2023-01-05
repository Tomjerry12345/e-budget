import { useState } from "react";

const HeaderComponentLogic = () => {
  const [filter, setFilter] = useState(false);
  const [more, setMore] = useState(false);

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

  return {
    value: {
      filter,
      more,
    },
    func: {
      onCilckFilter,
      onCloseFilter,
      onClickMore,
      onCloseMore,
    },
  };
};

export default HeaderComponentLogic;
