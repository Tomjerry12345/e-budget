/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { columnOutputType3 } from "component/table/utils/TypeColumn";
import MainServices from "services/MainServices";
import { getLocal } from "values/Utilitas";

const rootEndpoint = "report";

const Logic = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(false);
  const [linkExport, setLinkExport] = useState(null);

  let params = useParams();

  // useEffect(() => {
  //   const codeCompany = getLocal("code_company");
  //   const userGroup = getLocal("user_group");
  //   loadData(
  //     userGroup === "superadmin" ? "211" : codeCompany,
  //     "all",
  //     "all",
  //     "all",
  //     "all",
  //     "all",
  //     "2023"
  //   );
  // }, []);

  const onFinish = async (values) => {
    setLoading(true);

    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_project,
      code_icp,
      periode,
    } = values;

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

    loadData(
      fCodeCompany,
      fCodeProduct,
      fCodeLocation,
      fCodeDept,
      fCodeIcp,
      fCodeProject,
      fPeriode
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
    const url = `${rootEndpoint}/neraca?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_department=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}&year=${periode}`;
    const { data } = await MainServices.get(url);
    getData(data.data, periode);

    setLinkExport(
      `${rootEndpoint}/export-neraca?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_department=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}&year=${periode}`
    );
  };

  const getData = (data, periode) => {
    setData(data.list);
    setColumns(columnOutputType3(periode, parseInt(periode) + 1));
    setLoading(false);
  };

  return {
    value: {
      data,
      columns,
      loading,
      params,
      linkExport,
    },
    func: {
      onFinish,
    },
  };
};

export default Logic;
