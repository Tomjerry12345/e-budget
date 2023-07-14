import { useEffect, useState } from "react";
import MainServices from "services/MainServices";
import { generateUID, log } from "values/Utilitas";
import { useLocation } from "react-router-dom";
import { fullNewRow, getRows } from "values/react-grid/rows/summary/capex/template-2/getRows";
import { getColumns } from "values/react-grid/rows/summary/capex/template-2/getColumns";

const Logic = () => {
  const [loading, setLoading] = useState(false);
  const [linkExport, setLinkExport] = useState(null);
  const [listMenu, setListMenu] = useState();

  const columns = getColumns();
  const [rows, setRows] = useState([]);

  const location = useLocation();

  const ENDPOINT_URL = "summary_capex/new_asset";

  // useEffect(() => {
  //   getDataAccount();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const getDataAccount = async () => {
  //   try {
  //     const split = location.pathname.split("/");
  //     const q = split[split.length - 1];
  //     const res = await MainServices.get(`config/opex/byalias/${q}`);
  //     log({ res });
  //     setItems(res.data.data[0]);
  //   } catch (e) {
  //     log({ e });
  //   }
  // };

  const onSetDataTable = (values) => {
    const { code_company, code_dept, code_product, code_project, code_icp, periode } = values;

    let fCodeCompany = code_company.split(" ");
    // let fCodeProduct = code_product.split(" ");
    // let fCodeDept = code_dept.split(" ");
    // let fCodeIcp = code_icp.split(" ");
    // let fCodeProject = code_project.split(" ");

    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    // fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    // fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    // fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    // fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fPeriode = fPeriode[0];

    // getData(fCodeCompany, fCodeProduct, fCodeDept, fCodeIcp, fCodeProject, fPeriode);
    getData({ codeCompany: fCodeCompany, periode: fPeriode });
  };

  const getData = async ({
    codeCompany,
    codeProduct,
    codeDept,
    codeIcp,
    codeProject,
    periode,
  }) => {
    const url = `${ENDPOINT_URL}?code_company=${codeCompany}&year=${periode}`;
    try {
      const { data } = await MainServices.get(url);
      log("data.data", data.data.length);
      let r;
      if (data.data.length > 0) {
        r = getRows({
          data: data.data,
        });
      } else {
        alert("null");
        r = fullNewRow({ id: generateUID() });
      }
      setRows(r);
    } catch (error) {
      // Tangani error jika ada
      console.error(`Error fetching data`, error);
    }

    // setLinkExport(
    //   `${ENDPOINT_URL}/export?code_company=${codeCompany}&code_product=${codeProduct}&code_department=${codeDept}&code_icp=${codeIcp}&code_project=${codeProject}&year=${periode}`
    // );
  };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  return {
    value: {
      columns,
      rows,
      loading,
      linkExport,
      listMenu,
    },
    func: {
      onFinish,
    },
  };
};

export default Logic;
