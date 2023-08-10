import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { allRouting } from "values/RoutingPage";
import { getKeyByValue, log } from "values/Utilitas";

const Logic = () => {
  const [more, setMore] = useState(false);
  const [header, setHeader] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const split = location.pathname.split("/");
    const q = split[split.length - 1];

    const h = getKeyByValue(allRouting[split[2]], q);

    log({ h });

    setHeader(h[1] === undefined ? h[0] : split[3] === "input" ? h[0] : h[1]);
  }, []);

  const onClickMore = () => {
    setMore(true);
  };

  const onCloseMore = () => {
    setMore(false);
  };

  const onExport = async (e, linkExport) => {
    try {
      let filename = e.filename;
      const codeAccount = e.code_account;

      if (filename === undefined) {
        filename = e.description.replaceAll(" ", "_");
        // filename = filename.split("_");
        // filename = filename.join("_");
      } else {
        filename = filename.split("/");
        filename = filename[filename.length - 1];
      }

      let url;

      if (codeAccount !== undefined) {
        url = `${linkExport}&code_account=${codeAccount}&filename=${filename}`;
      } else {
        url = `${linkExport}}&filename=${filename}`;
      }

      const res = await MainServices.download(url);
      log({ res });
      const fileURL = URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `summary_${filename}`;
      link.click();
    } catch (e) {
      log({ e });
      responseShow({
        status: 400,
        message: "Terjadi kesalahan saat melakuan export",
      });
    }
  };

  const responseShow = ({ status, message }) => {
    dispatch(
      val({
        status,
        message,
      })
    );
  };

  return {
    value: {
      more,
      header,
    },
    func: {
      onClickMore,
      onCloseMore,
      onExport,
    },
  };
};

export default Logic;