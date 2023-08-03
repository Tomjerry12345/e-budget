import { useEffect, useState } from "react";
import MainServices from "services/MainServices";
import { generateUID, log } from "values/Utilitas";
import { useLocation } from "react-router-dom";
import { getColumns } from "./getColumns";
import { fullNewRow, getRows } from "./getRows";

const Logic = () => {
  const [loading, setLoading] = useState(false);
  const [linkExport, setLinkExport] = useState(null);
  const [listMenu, setListMenu] = useState();

  const columns = getColumns();
  const [rows, setRows] = useState([]);

  const location = useLocation();

  const ENDPOINT_URL = "summary-capex/new-asset/depreciated";
  const ENDPOINT_URL_EXPORT = "summary-capex/export/new-asset/depreciated";

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
      // setCodeFilter(formatFilter);
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  };

  const getData = async (params) => {
    const url = `${ENDPOINT_URL}`;
    try {
      const { data } = await MainServices.get(url, params);
      log("data.data", data.data.length);
      let r;
      if (data.data.length > 0) {
        r = getRows({
          data: data.data,
        });
      } else {
        r = fullNewRow({ id: generateUID() });
      }
      setRows(r);
    } catch (error) {
      // Tangani error jika ada
      console.error(`Error fetching data`, error);
    }

    const {
      code_company,
      code_department,
      code_location,
      code_product,
      code_project,
      code_icp,
      periode,
    } = params;

    setLinkExport(
      `${ENDPOINT_URL_EXPORT}?
      code_company=${code_company}
      &code_location=${code_location}
      &code_product=${code_product}
      &code_department=${code_department}
      &code_icp=${code_icp}&code_project=${code_project}
      &year=${periode}`
    );
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
