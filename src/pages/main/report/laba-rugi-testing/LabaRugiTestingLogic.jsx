import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import MainServices from "../../../../services/MainServices";
import { log } from "../../../../values/Utilitas";

const rootEndpoint = "report/newlabarugi";

const LabaRugiTestingLogic = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(false);
  const [codeFilter, setCodeFilter] = useState();

  const codeCompany = "211";

  let params = useParams();

  useEffect(() => {
    loadData(codeCompany, "all", "all", "all", "all", "all");
  }, []);

  const onFinish = async (values) => {
    setLoading(true);

    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_project,
      code_icp,
    } = values;

    // alert("test");

    let fCodeCompany = code_company.replace(/[^0-9]/g, "000");
    let fCodeProduct = code_product.replace(/[^0-9]/g, "000");
    let fCodeLocation = code_location.replace(/[^0-9]/g, "000");
    let fCodeDept = code_dept.replace(/[^0-9]/g, "000");
    let fCodeIcp = code_icp.replace(/[^0-9]/g, "000");
    let fCodeProject = code_project.replace(/[^0-9]/g, "000");

    fCodeProduct = fCodeProduct === "" ? "all" : fCodeProduct;
    fCodeLocation = fCodeLocation === "" ? "all" : fCodeLocation;
    fCodeDept = fCodeDept === "" ? "all" : fCodeDept;
    fCodeIcp = fCodeIcp === "" ? "all" : fCodeIcp;
    fCodeProject = fCodeProject === "" ? "all" : fCodeProject;

    log("fCodeProject", fCodeProject);

    loadData(
      fCodeCompany,
      fCodeProduct,
      fCodeLocation,
      fCodeDept,
      fCodeIcp,
      fCodeProject
    );

    setCodeFilter({
      code_company: fCodeCompany,
      code_dept: fCodeDept,
      code_location: fCodeLocation,
      code_product: fCodeProduct,
      code_product: fCodeProduct,
      code_icp: fCodeIcp,
      code_project: fCodeProject,
    });
  };

  const loadData = async (
    fCodeCompany,
    fCodeProduct,
    fCodeLocation,
    fCodeDept,
    fCodeIcp,
    fCodeProject
  ) => {
    const url = `${rootEndpoint}?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_dept=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}`;

    const { data } = await MainServices.get(url);
    log("res", data);
    getData(data.data);
  };

  const getData = (data) => {
    let list = [];
    let year_1 = "";
    let year_2 = "";

    data?.list?.forEach((val) => {
      year_1 = val.detail[0].year;
      year_2 = val.detail[1].year;
      const v1 = parseInt(val.detail[0].value).format(0, 3, ".", ",");
      const v2 = parseInt(val.detail[1].value).format(0, 3, ".", ",");
      list.push({
        account: val.code,
        description: val.description,
        description: val.description,
        type_row: val.type_row,
        value_1: v1 === "NaN" ? "" : v1,
        value_2: v2 === "NaN" ? "" : v2,
      });
    });
    setData(list);
    setColumns(columnOutputType1(year_1, year_2));
    setLoading(false);
  };

  const downloadFile = () => {
    const { code_company, code_dept, code_location, code_product } = codeFilter;
    const urlFile = `https://apikalla.binaries.id/ebudget/report/tablereport?code_company=${code_company}&code_location=${code_location}&code_dept=${code_dept}&code_product=${code_product}`;
    window.location.href = urlFile;
  };

  return {
    value: {
      data,
      columns,
      loading,
      params,
    },
    func: {
      onFinish,
      downloadFile,
    },
  };
};

export default LabaRugiTestingLogic;