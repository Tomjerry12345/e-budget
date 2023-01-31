import { Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { columnOutputType1 } from "../../../../component/table/utils/TypeColumn";
import { getAsync } from "../../../../redux/main/main.thunks";
import { loadStart } from "../../../../redux/response/response";
import MainServices from "../../../../services/MainServices";
import { getSizeScreen, log } from "../../../../values/Utilitas";

// const endPoint = {
//   "Opex Direct": "",
// };

const MppSummaryLogic = () => {
  let params = useParams();

  const ref = createRef();

  const dispatch = useDispatch();

  const { isLoading, response, errorMessage, nameReducer } = useSelector(
    (state) => state.reducer
  );

  const navigate = useNavigate();

  const itemPage = params.item;

  const [tableColumn, setTableColumn] = useState(null);

  const [dataColumn, setDataColumn] = useState([
    {
      account: "",
      description: "",
      year_1: "",
      year_2: "",
      value_1: 0,
      value_2: 0,
    },
  ]);

  // const [size, setSize] = useState({
  //   x: window.innerWidth,
  //   y: window.innerHeight,
  // });

  const [loading, setLoading] = useState(false);
  const [codeFilter, setCodeFilter] = useState();
  // useEffect(() => {
  //   window.onresize = getSizeScreen(setSize);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   log("response", response);

  //   if (response !== null) {
  //     if (nameReducer === "get-data") {
  //       const { data } = response;
  //       let list = [];
  //       let year_1 = "";
  //       let year_2 = "";

  //       data?.list?.forEach((val) => {
  //         year_1 = val.detail[0].year;
  //         year_2 = val.detail[1].year;
  //         const v1 = parseInt(val.detail[0].value).format(0, 3, ".", ",");
  //         const v2 = parseInt(val.detail[1].value).format(0, 3, ".", ",");
  //         list.push({
  //           account: val.account,
  //           description: val.description,
  //           value_1: v1,
  //           value_2: v2,
  //         });
  //       });
  //       setDataColumn(list);
  //       onSetColumn(year_1, year_2);
  //       setLoading(false);
  //     }
  //   } else {
  //     console.log(`error ${errorMessage}`);
  //   }
  // }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  // const onSetColumn = (year_1, year_2) => {
  //   const constantTableColums = {
  //     "Summary MPP": [
  //       {
  //         title: "Account",
  //         dataIndex: "account",
  //         width: "4%",
  //         fixed: "left",
  //       },
  //       {
  //         title: "Description",
  //         dataIndex: "description",
  //         width: "30%",
  //       },
  //       {
  //         title: `Year ${year_1}`,
  //         dataIndex: "value_1",
  //         width: "4%",
  //         fixed: "right",
  //       },
  //       {
  //         title: `Year ${year_2}`,
  //         dataIndex: "value_2",
  //         width: "4%",
  //         fixed: "right",
  //       },
  //       // {
  //       //   dataIndex: "operation",
  //       //   fixed: "right",
  //       //   width: "5%",
  //       //   render: (_, record) =>
  //       //     dataColumn.length >= 1 ? (
  //       //       <Dropdown overlay={menu} placement="bottom">
  //       //         <Button icon={<MoreVertIcon />}></Button>
  //       //       </Dropdown>
  //       //     ) : null,
  //       // },
  //     ],
  //   };

  //   const columns = constantTableColums[itemPage];

  //   setTableColumn(columns);
  // };

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const onSetDataTable = async (values) => {
    // setDataColumn(constantDataTable[itemPage]);
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_icp,
      code_project,
    } = values;

    let url;

    let fCodeCompany = code_company.split(" ");
    let fCodeProduct = code_product.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");

    fCodeCompany = fCodeCompany[0] === "ALL" ? "all" : fCodeCompany[0];
    fCodeProduct = fCodeProduct[0] === "ALL" ? "all" : fCodeProduct[0];
    fCodeLocation = fCodeLocation[0] === "ALL" ? "all" : fCodeLocation[0];
    fCodeDept = fCodeDept[0] === "ALL" ? "all" : fCodeDept[0];
    fCodeIcp = fCodeIcp[0] === "ALL" ? "all" : fCodeIcp[0];
    fCodeProject = fCodeProject[0] === "ALL" ? "all" : fCodeProject[0];

    url = `mpp/summary?code_company=${fCodeCompany}&code_product=${fCodeProduct}&code_location=${fCodeLocation}&code_dept=${fCodeDept}&code_icp=${fCodeIcp}&code_project=${fCodeProject}`;

    log("url", url);

    // dispatch(getAsync(url, "get-data"));

    const { data } = await MainServices.get(url);
    log("res", data);

    getData(data.data);

    setCodeFilter({
      code_company: fCodeCompany,
      code_dept: fCodeDept,
      code_location: fCodeLocation,
      code_product: fCodeProduct,
    });
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
        account: val.account,
        description: val.description,
        value_1: v1,
        value_2: v2,
      });
    });
    setDataColumn(list);
    setTableColumn(columnOutputType1(year_1, year_2));
    setLoading(false);
  };

  const onTambahData = () => {
    dispatch(loadStart());
    navigate(`/main/mpp/Input/${itemPage}`);
  };

  const downloadFile = () => {
    const { code_company, code_dept, code_location, code_product } = codeFilter;
    const urlFile = `https://apikalla.binaries.id/ebudget/report/tablereport?code_company=${code_company}&code_location=${code_location}&code_dept=${code_dept}&code_product=${code_product}`;
    window.location.href = urlFile;
  };

  return {
    value: {
      dataColumn,
      tableColumn,
      params,
      ref,
      loading,
      // size,
    },
    func: {
      onTambahData,
      onFinish,
      downloadFile,
    },
  };
};

export default MppSummaryLogic;
