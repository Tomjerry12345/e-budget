import { useEffect, useState } from "react";

const HeaderComponentType1Logic = ({ onChangeFilter }) => {
  const [filter, setFilter] = useState(false);
  const [more, setMore] = useState(false);

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

  return {
    value: {
      more,
      filter,
    },
    func: {
      onCilckFilter,
      onCloseFilter,
      onClickMore,
      onCloseMore,
    },
  };
};

export default HeaderComponentType1Logic;
