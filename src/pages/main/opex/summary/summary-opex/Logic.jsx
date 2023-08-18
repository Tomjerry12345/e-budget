import { useState } from "react";
import MainServices from "services/MainServices";
import { fullNewRow, getRows } from "./getRows";
import { getColumns } from "./getColumns";

const Logic = () => {
  const [loading, setLoading] = useState(false);
  const [linkExport, setLinkExport] = useState(null);

  const columns = getColumns();
  const [rows, setRows] = useState([]);

  const ENDPOINT_URL = "direct/opex";

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
    let fCodeProject = code_project.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fPeriode = fPeriode[0];

    return {
      code_company: fCodeCompany,
      code_product: fCodeProduct,
      code_project: fCodeProject,
      code_location: fCodeLocation,
      code_department: fCodeDept,
      code_icp: fCodeIcp,
      year: fPeriode,
    };
  };

  const onSetDataTable = (values) => {
    const formatFilter = formatingFilter(values);

    try {
      getData(formatFilter);

      const {
        code_company,
        code_product,
        code_project,
        code_location,
        code_department,
        code_icp,
        year,
      } = formatFilter;
      setLinkExport(
        `${ENDPOINT_URL}/export?code_company=${code_company}&code_location=${code_location}&code_product=${code_product}&code_department=${code_department}&code_icp=${code_icp}&code_project=${code_project}&year=${year}`
      );
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  };

  const getData = async (params) => {
    const url = `${ENDPOINT_URL}/summary`;
    try {
      const { data } = await MainServices.get(url, params);
      let r;
      if (data.data.length > 0) {
        r = getRows({
          data: data.data,
        });
      } else {
        r = fullNewRow();
      }
      setRows(r);
    } catch (error) {
      console.error(`Error fetching data for code account`, error);
    }
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
    },
    func: {
      onFinish,
    },
  };
};

export default Logic;
