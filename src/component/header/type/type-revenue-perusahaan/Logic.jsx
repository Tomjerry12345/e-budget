import { useDispatch, useSelector } from "react-redux";
import { actionData } from "redux/data-global/data.reducer";
import { actionImport } from "redux/action/action.reducer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { allRouting } from "values/RoutingPage";
import { useDropzone } from "react-dropzone";
import { constantExcellFile } from "values/Constant";
import { log } from "values/Utilitas";

const Logic = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const importRedux = useSelector((state) => state.import);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const [header, setHeader] = useState("");
  const [file, setFile] = useState("");

  const [perusahaan, setPerusahaan] = useState("");

  useEffect(() => {
    const split = location.pathname.split("/");
    const q = split[split.length - 2];

    log({ q });

    setPerusahaan(q);

    const h = allRouting[split[2]][q];

    setHeader(h);
  }, []);

  useEffect(() => {
    if (importRedux.file === null) {
      acceptedFiles.length = 0;
    }
  }, [importRedux.file]);

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

  const onClickImport = (d) => {
    dispatch(
      actionImport({
        openImport: true,
      })
    );
    // dispatch(actionData({ indexImport: d }));
    const f = `file/revenue-cogs/${perusahaan}_${d.file}`;

    log({ f });

    setFile(f);
  };

  const onCloseImport = () => {
    dispatch(
      actionImport({
        openImport: false,
      })
    );
  };

  const onUploadFile = () => {
    let file1;
    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    dispatch(
      actionImport({
        file: file1,
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
      file,
    },
    func: {
      onClickMore,
      onCloseMore,
      onClickImport,
      onCloseImport,
      onUploadFile,
    },
  };
};

export default Logic;
