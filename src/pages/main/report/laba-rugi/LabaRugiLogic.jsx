import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  columnOutputType1,
  columnOutputType2,
} from "../../../../component/table/utils/TypeColumn";
import MainServices from "../../../../services/MainServices";
import { log } from "../../../../values/Utilitas";

const rootEndpoint = "report/newlabarugi";

const LabaRugiLogic = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(false);
  const [codeFilter, setCodeFilter] = useState();

  const codeCompany = "211";

  let params = useParams();

  useEffect(() => {
    loadData(codeCompany, "all", "all", "all", "all", "all", "2023");
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

    let fCodeCompany = code_company.split(" ");
    let fCodeProduct = code_product.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");

    let periode = "2023";

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];

    // setCodeFilter({
    //   code_company: fCodeCompany,
    //   code_dept: fCodeDept,
    //   code_location: fCodeLocation,
    //   code_product: fCodeProduct,
    //   code_product: fCodeProduct,
    //   code_icp: fCodeIcp,
    //   code_project: fCodeProject,
    // });

    loadData(
      fCodeCompany,
      fCodeProduct,
      fCodeLocation,
      fCodeDept,
      fCodeIcp,
      fCodeProject,
      periode
    );
  };

  const loadData = async (
    fCodeCompany,
    fCodeProduct,
    fCodeLocation,
    fCodeDept,
    fCodeIcp,
    fCodeProject,
    periode
  ) => {
    const url = `${rootEndpoint}?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_dept=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}&periode=${periode}`;
    log("url", url);
    const { data } = await MainServices.get(url);
    log("res", data);
    getData(data.data);

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

  const getData = (data) => {
    // let list = [];
    // let year_1 = "";
    // let year_2 = "";

    // data?.list?.forEach((val) => {
    //   year_1 = val.detail[0].year;
    //   year_2 = val.detail[1].year;
    //   const v1 = parseInt(val.detail[0].value).format(0, 3, ".", ",");
    //   const v2 = parseInt(val.detail[1].value).format(0, 3, ".", ",");
    //   list.push({
    //     account: val.code,
    //     description: val.description,
    //     description: val.description,
    //     type_row: val.type_row,
    //     value_1: v1 === "NaN" ? "" : v1,
    //     value_2: v2 === "NaN" ? "" : v2,
    //   });
    // });
    setData(data.list);
    // setColumns(columnOutputType1(year_1, year_2));
    const dt = new Date();

    setColumns(columnOutputType2(dt.getFullYear(), dt.getFullYear() + 1));
    setLoading(false);
  };

  const downloadFile = () => {
    log("codeFilter", codeFilter);
    const {
      code_company,
      code_product,
      code_location,
      code_dept,
      code_icp,
      code_project,
    } = codeFilter;
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

export default LabaRugiLogic;
