import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionData } from "../../../../../redux/data-global/data.reducer";
import { actionImport } from "../../../../../redux/action/action.reducer";
import { log } from "../../../../../values/Utilitas";

const HeaderComponentTypeInputLogic = () => {
  const dispatch = useDispatch();
  const importRedux = useSelector((state) => state.import);

  useEffect(() => {
    log({ importRedux });
  }, [importRedux]);

  const onClickMore = () => {
    dispatch(
      actionImport({
        openMore: true,
      })
    );
  };

  const onCloseMore = () => {
    dispatch(
      actionImport({
        openMore: false,
      })
    );
  };

  const onClickImport = (i) => {
    log({ i });
    dispatch(
      actionImport({
        openImport: true,
      })
    );
    dispatch(actionData({ indexImport: i }));
  };

  const onCloseImport = () => {
    dispatch(
      actionImport({
        openImport: false,
      })
    );
  };

  return {
    value: {
      importRedux,
    },
    func: {
      onClickMore,
      onCloseMore,
      onClickImport,
      onCloseImport,
    },
  };
};

export default HeaderComponentTypeInputLogic;
