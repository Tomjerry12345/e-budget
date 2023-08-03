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

  const formatingFilter = (filter) => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_project,
      code_icp,
      periode,
    } = filter;

    let fCodeCompany = code_company.split(" ");
    let fCodeProduct = code_product.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");
    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fPeriode = fPeriode[0];

    return {
      code_company: fCodeCompany,
      code_product: fCodeProduct,
      code_location: fCodeLocation,
      code_department: fCodeDept,
      code_icp: fCodeIcp,
      code_project: fCodeProject,
      year: fPeriode,
    };
  };

  const onSetDataTable = (values) => {
    const formatFilter = formatingFilter(values);

    try {
      getData(formatFilter);
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  };

  const getData = async (params) => {
    const url = `${ENDPOINT_URL}/load`;
    const { data } = await MainServices.get(url, params);
    log("data.data", data.data.data);
    let r;
    if (data.data.data.length > 0) {
      r = getRows({
        data: data.data.data,
      });
    } else {
      r = fullNewRow({ id: generateUID() });
    }
    setRows(r);
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
