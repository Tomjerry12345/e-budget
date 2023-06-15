import { useDispatch, useSelector } from "react-redux";
import { actionData } from "redux/data-global/data.reducer";
import { actionImport } from "redux/action/action.reducer";
import { getKeyByValue, log } from "values/Utilitas";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { allRouting } from "values/RoutingPage";
import { useDropzone } from "react-dropzone";

const HeaderComponentTypeRevenuePerusahaanLogic = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const importRedux = useSelector((state) => state.import);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const [header, setHeader] = useState("");

  useEffect(() => {
    const split = location.pathname.split("/");
    const q = split[split.length - 2];

    log({ q });
    log("split", split[2]);

    const h = allRouting[split[2]][q];
    log({ h });

    setHeader(h);
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
      acceptedFiles,
      getRootProps,
      getInputProps,
    },
    func: {
      onClickMore,
      onCloseMore,
      onClickImport,
      onCloseImport,
    },
  };
};

export default HeaderComponentTypeRevenuePerusahaanLogic;
