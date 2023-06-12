import { useDispatch, useSelector } from "react-redux";
import { actionData } from "redux/data-global/data.reducer";
import { actionImport } from "redux/action/action.reducer";
import { getKeyByValue, log } from "values/Utilitas";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { allRouting, routingOpex } from "values/RoutingPage";

const HeaderComponentTypeInputLogic = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const importRedux = useSelector((state) => state.import);

  const [header, setHeader] = useState("");

  useEffect(() => {
    const split = location.pathname.split("/");
    const q = split[split.length - 1];

    const h = getKeyByValue(allRouting[split[2]], q);

    setHeader(h[0]);
  }, []);

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
      header,
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
